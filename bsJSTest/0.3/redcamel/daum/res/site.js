(function() {
    'use strict';
    red.$static('SITE', (function() {

        var data
        var header={}
        var contents={}
        var hotnews={}
        var footer = {}

        function setHeader() {
            var loopSRC='<img src="res/loop.gif">', d, box, containerBox, logoBox, naviBox, utilBox, clear
            d=data.header
            if(d.use==false) return
            box=red.dom('div').$('{}', '#stage', 'html', '', 'background', d.bgColor,'color',d.color,'padding',10)
            containerBox=red.dom('div').$('{}', box, 'max-width', +d.maxWidth, '@class', '_MARGIN_CENTER')
            logoBox=red.dom('div').$('{}', containerBox, 'html', d.logoSRC ? '<img src="' + d.logoSRC + '">' : "", '@class', '_FL')
        //    naviBox=red.dom('div').$('{}', containerBox, 'html', 'naviBox' + loopSRC, '@class', '_FL')
        //    utilBox=red.dom('div').$('{}', containerBox, 'html', 'utilBox' + loopSRC, '@class', '_FR')
            clear=red.dom('div').$('{}', containerBox, 'height', 0, '@class', '_CLEAR')

            header.box=box
            header.containerBox=containerBox
            header.logoBox=logoBox
         //   header.naviBox=naviBox
         //   header.utilBox=utilBox
        }

        function setContents() {
            var loopSRC='<img src="res/loop.gif">', d, box, containerBox, naviBox
            d=data.contents
            if(d.use==false) return
            box=red.dom('div').$('{}', '#stage', 'html', '', 'background', d.bgColor,'color',d.color)
            containerBox=red.dom('div').$('{}', box, 'max-width', +d.maxWidth, '@class', '_MARGIN_CENTER')
            naviBox=red.dom('div').$('{}', containerBox)

            contents.box=box
            contents.containerBox=containerBox
            contents.naviBox=naviBox

        }

        function setHotNews() {
            var loopSRC='<img src="res/loop.gif">', d, box, containerBox, logoBox, naviBox, utilBox, clear
            d=data.hotNews
            if(d.use==false) return
            box=red.dom('div').$('{}', '#stage', 'html', '', 'background', d.bgColor,'color',d.color)
            containerBox=red.dom('div').$('{}', box, 'max-width', +d.maxWidth, '@class', '_MARGIN_CENTER')
            naviBox=red.dom('div').$('{}', containerBox, 'html', 'hotNews' + loopSRC, '@class', '_FL')
            clear=red.dom('div').$('{}', containerBox, 'height', 0, '@class', '_CLEAR')

            hotnews.box=box
            hotnews.containerBox=containerBox
            hotnews.naviBox=naviBox
        }

        function setFooter() {
            var loopSRC='<img src="res/loop.gif">', d, box, containerBox, logoBox, copyrightBox, utilBox, clear
            d=data.footer
            if(d.use==false) return
            box=red.dom('div').$('{}', '#stage', 'html', '', 'background', d.bgColor,'padding',10,'color',d.color)
            containerBox=red.dom('div').$('{}', box, 'max-width', +d.maxWidth, '@class', '_MARGIN_CENTER')
            logoBox=red.dom('div').$('{}', containerBox, 'html', d.logoSRC ? '<img src="' + d.logoSRC + '">' : "", '@class', '_FL')
            copyrightBox=red.dom('div').$('{}', containerBox, 'html', d.copyright, '@class', '_FL','padding','5px 5px 5px 15px')
          //  utilBox=red.dom('div').$('{}', containerBox, 'html', 'utilBox' + loopSRC, '@class', '_FR')
            clear=red.dom('div').$('{}', containerBox, 'height', 0, '@class', '_CLEAR')

            footer.box=box
            footer.containerBox=containerBox
            footer.logoBox=logoBox
            footer.copyrightBox=copyrightBox
         //   footer.utilBox=utilBox
        }

        return {
            start: function($data) {
                data=$data
                setHeader()
                setContents()
                setHotNews()
                setFooter()
            },
            contents: contents,
            header : header,
            hotnews : hotnews
        }

    })()
    )
})();

