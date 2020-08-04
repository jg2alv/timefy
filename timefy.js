(function () {
    const getTotalTime = async () => {
        const timestamps = [],
            getSeconds = (time) => {
                // Get timestamps as mm:ss or hh:mm:ss and convert to seconds.
                time = time.split(':');
                return time[2] ? Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]) : Number(time[0]) * 60 + Number(time[1])
            };

        // Waiting for page to be fully loaded
        while ($('span.ytd-thumbnail-overlay-time-status-renderer').length === 0) {
            await new Promise(res => setTimeout(res, 500));
        }

        $('span.ytd-thumbnail-overlay-time-status-renderer').each(function () {
            timestamps.push(getSeconds(this.innerHTML));
        });

        const time = timestamps.reduce((acc, time) => acc += time, 0), // Summing all seconds up into one single final timestamp
            tag = document.createElement('yt-formatted-string'),
            prev = $('[data-time-custom]', '#stats'); // Looking for a previous sum-time element

        let h = Math.floor(time / 3600), // Hours
            m = Math.floor(time / 60), // Minutes
            s = Math.floor(time % 60); // Seconds

        while (m > 60) {
            m -= 60;
            // I thought I needed a "h++" here, but it seems I don't
        }

        // Prettyfying
        h = new String(h).padStart(2, 0);
        m = new String(m).padStart(2, 0);
        s = new String(s).padStart(2, 0);

        tag.className = 'style-scope ytd-playlist-sidebar-primary-info-renderer';
        tag.setAttribute('data-time-custom', '');
        tag.setAttribute('title', `or ${time} seconds long`);

        if (prev.length) {
            $(prev).html(`${h}:${m}:${s} long`).attr('title', `or ${time} seconds long`);
            return;
        }

        // Need to insert document into DOM before setting its innerHTML to avoid "<!--css-build:shady-->"
        $('#stats').append(tag);
        tag.html(`${h}:${m}:${s}`);
    };

    // In case of playlist lazy-loading
    $(window).on('scroll', getTotalTime);
    getTotalTime();
})();
