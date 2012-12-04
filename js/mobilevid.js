/* ===================================================
 * jquery-mobilevid v1.0
 * 
 * ===================================================
 * Copyright 2012 Alexandre Assouad
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
(function($){
    $.mobileVideo = function(selector, settings){


        /************** plugin initialisation **************/

        //default config
        var config = {
        };
        if (settings){$.extend(config, settings);}
        
        //Test if mandatory options are here
        if(config.sd_video_url === undefined)
            throw 'At least one sd_video_url must be given';

        //html5 video support test :
        if(!document.createElement('video').canPlayType)
            throw 'HTML5 video unsupported';

        //Get selected elements
        var vid = $('video' + selector);

        //Parameters check : only one video tag must be selected 
        if(vid[0] === undefined)
            throw 'Selected element is empty';
        if(vid.length > 1)
            throw 'Multiple video tag selected';


        //Set defautl hd url if not available
        if(config.hd_video_url === undefined)
            config.hd_video_url = config.sd_video_url;


        /************** plugin initialisation **************/

        //we clone dom vid node
        var _vid = vid.clone();
        var parent = vid.parent();

        var _selector = selector.substring(1);
        parent.html('<div id="mobilevid_'+_selector+'" class="mobilevid_container"><div class="play-control"></div></div>');
        var container = $('#mobilevid_'+_selector);

        //set controls to false
        _vid.attr("controls",false);

        //set poster if provided
        if(config.poster_url !== undefined)
            _vid.attr('poster', config.poster_url);
    
        //we load hd version of the video on large ipad screen and high density pixel screens
        if(window.innerWidth >= 768 || window.devicePixelRatio > 1.5)
        {
            _vid[0].src = config.hd_video_url;
            _vid[0].load();
        }
        else
        {
            _vid[0].src = config.sd_video_url;
            _vid[0].load();
        }


        //we stop video when we go out fullscreen (on safari and chrome desktop)
        /*$(document).on("webkitfullscreenchange", function() {
            if(!document.webkitIsFullScreen)
                _vid[0].pause();
            console.log("webkitfullscreenchange");
        });*/

        //we stop video when we go out fullscreen (on safari and chrome mobile)
        _vid[0].addEventListener("webkitendfullscreen", function() {
            _vid[0].pause();
            console.log("webkitfullscreenchange");
        });



        //we close video at the end
        _vid.on("ended", function() {
            _vid[0].webkitExitFullScreen();
        });



        //we display controls on tablets
        //if(screen.width/window.devicePixelRatio >= 768)
        if(window.innerWidth >= 768)
        {
            _vid.attr("controls",true);
        }
        else if(!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))) {
            //play button activated by default on iPhone / iPod so we only add a play button on other devices.
            container.children('.play-control').addClass('play-button ');
    
            _vid.click(function(){
                //small fix to trigger fullscreen on samsung galaxy SIII
                _vid[0].webkitEnterFullscreen && _vid[0].webkitEnterFullscreen();
                _vid[0].play();
            });
            
            container.children('.play-control').click(function(){
                //small fix to trigger fullscreen on samsung galaxy SIII
                _vid[0].webkitEnterFullscreen && _vid[0].webkitEnterFullscreen();
                _vid[0].play();
            }); 
        }


        //we have to clone our vid with the new parameters. We also fix width for windows phone terminals
        _vid.prependTo(container).css('width', '100%');
        vid.remove();
        
        return this;
    };
})(jQuery);