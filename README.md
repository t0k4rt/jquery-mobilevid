# jQuery-MobileVid #

This (really small) jQuery module is aimed at embedding easily videos on a mobile page.
This module is aimed providing the best video experience on tablet. 
No fancy theming, no unusefull js, it uses only HTLM5 video tag to display corectly a video on majors smartphones and tablets.


## Compatibility ##

Tested on :

* iPhone with iOs >= 4.0
* Android smartphones with Android >= 2.1
* iPad iOs >= 3.2
* Should work well on Android Tablets

## Requirements ##

* tested with jQuery 1.7.
* must be working with at least jQuery 1.4

## To get started ##

Add a video tag in your code :

    <video id="video_1">
    </video>
    
And use : 
    
    $.mobileVideo('#video_1', options)
    
minimal options :

    options = {
        'sd_video_url' : 'http://video_sd.mp4'
        }

Supported options : 

    options = {
        'sd_video_url' : 'http://video_sd.mp4',      //Give your videp file url
        'hd_video_url' : 'http://video_hd.mp4',      //Can play different video file on large screens of Hidef screens if given
        'poster' : true,                             //Show or hide poster
        'poster_url' : './img/illustration.jpg'      //Set poster image
    };
