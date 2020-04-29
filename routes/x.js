const Xray = require('x-ray');

const baseUrl = 'https://channelmyanmar.org/movies/';
const pageUrl = 'https://channelmyanmar.org/movies/page/';
const thisUrl = 'http://localhost:3000/';
const catUrl = 'https://channelmyanmar.org/category/';

const x = Xray({
    filters: {
        trim: function(value) {
            return typeof value === 'string' ? value.replace(/\n|\r\n?/g, '') : value
        },
        replace: function(value) {
            return typeof value === 'string' ? value.replace('https://channelmyanmar.org/', 'http://localhost:3000/movie/') : value
        },
        change: function(value) {
            return typeof value === 'string' ? value.replace('https://channelmyanmar.org/', 'http://localhost:3000/') : value
        },
        category: function(value, i) {
            if (typeof value === 'string') {
                let _refine = value.replace('https://channelmyanmar.org/category', '');
                let refine = _refine.substring(1, _refine.length - 1);
                return refine;
            }
        },
        decs: function(value) {
            if (typeof value === 'string') {
                let refine = value.trim();
                let spl = refine.split("'1564385425']);");
                let spX = spl[1].trim();
                let final = spX.split('\n\n\nvar')
                    // return spl[1].trim();
                return final[0]
            }
        },
        number: function(value) {
            return typeof value === 'string' ? Number(value.replace(/\D+/g, '')) : value
        },
        fix2: function(value) {
            if (typeof value === 'string') {
                let refine = Number(value) + 1;
                let refine2 = thisUrl + 'movies/page/' + refine;
                return refine2;
            }
        },
        next: function(value) {
            if (typeof value === 'string') {
                let refine = Number(value) + 1;
                return refine;
            }
        },
        regex: function(value) {
            return typeof value === 'string' ? value.replace(/(\(.*?\))/g, '') : value
        },
        slug: function(value) {
            if (typeof value === 'string') {
                let _refine = value.replace('https://channelmyanmar.org', '');
                let refine = _refine.substring(1, _refine.length - 1);
                return refine;
            }
        },

        yadi: function(value) {
            if (typeof value === 'string') {
                if (value.includes("https://yadi.sk")) {
                    // var url = getUrl(value);
                    return value;
                }
                return;
            }
        },
        yadiId: function(value) {
            return typeof value === 'string' ? value.replace('https://yadi.sk/', '') : value
        },
        mega: function(value) {
            if (typeof value === 'string') {
                if (value.includes("https://mega.nz/")) {
                    var url = value.replace("https://mega.nz/file", "https://mega.nz/embed");
                    return url;
                }
                return;
            }
        },
        host: function(value) {
            if (typeof value === 'string') {
                var url = value.replace("https://", "").trim();
                //url = url.split(".")[0];
                if (url.includes("Soliddrive.co")) {
                    url = "SolidDrive";
                } else if (url.includes("drive.google.com")) {
                    url = "Myandrive";
                } else if (url.includes("disk.yandex.com")) {
                    url = "Yandex";
                } else if (url.includes("mirrorace")) {
                    url = "Mirrorace";
                } else if (url.includes("fastload")) {
                    url = "Fastload";
                } else if (url.includes("megaup")) {
                    url = "MegaUp";
                } else if (url.includes("mega")) {
                    url = "Mega";
                } else if (url.includes("1fichier.com")) {
                    url = "1Fichier";
                } else if (url.includes("upstream.to")) {
                    url = "Upstream";
                } else if (url.includes("yuudrive.me")) {
                    url = "Yuudrive";
                } else if (url.includes("yoteshinportal.cc")) {
                    url = "YoteshinPortal";
                } else if (url.includes("mediafire.com")) {
                    url = "Mediafire";
                };
                return url;
            }
        }
    }
});


module.exports = x;