// ==UserScript==
// @name         Class Information Selector
// @namespace    http://tampermonkey.net/
// @version      0.85
// @description  Download the class timetable
// @author       iam.slightlywind@themajorones.dev
// @match        https://fap.fpt.edu.vn/*
// ==/UserScript==

(function () {
    'use strict';

    function getSelectedIndex() {
        var classSelect = document.getElementById('ctl00_mainContent_dllCourse');
        return classSelect.selectedIndex;
    }

    function setSelectedIndex(index) {
        var classSelect = document.getElementById('ctl00_mainContent_dllCourse');
        classSelect.selectedIndex = index;
        classSelect.dispatchEvent(new Event('change'));
    }

    function downloadTextContent(className) {
        var textContent = document.getElementById('ctl00_mainContent_lblNewSlot').innerHTML;
        var parser = new DOMParser();
        var doc = parser.parseFromString(textContent, 'text/html');
        var lines = doc.body.textContent.split(',');
        var output = className + '\n';

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            var parts = line.split(':');
            if (parts.length < 3) continue;

            var day = parts[0].trim();
            var slot = doc.getElementsByTagName('b')[i*3].textContent.trim();

            var dayNumber;
            switch (day) {
                case 'Mon': dayNumber = 2; break;
                case 'Tue': dayNumber = 3; break;
                case 'Wed': dayNumber = 4; break;
                case 'Thu': dayNumber = 5; break;
                case 'Fri': dayNumber = 6; break;
                case 'Sat': dayNumber = 2; break;
                default: continue;
            }

            output += dayNumber + slot + ' ';
        }

        var allClassesContent = localStorage.getItem('allClassesContent') || '';
        allClassesContent += output.trim() + '\n\n';
        localStorage.setItem('allClassesContent', allClassesContent);
    }

    function downloadAllClasses() {
        var allClassesContent = localStorage.getItem('allClassesContent') || '';
        const blob = new Blob([allClassesContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'AllClasses.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    var customButton = document.createElement('button');
    customButton.innerHTML = 'Download All Classes';
    customButton.style.position = 'fixed';
    customButton.style.top = '10px';
    customButton.style.left = '10px';
    customButton.addEventListener('click', function () {
        localStorage.setItem('scriptRunning', 'true');
        setSelectedIndex(0);
    });

    document.body.appendChild(customButton);

    var scriptRunning = localStorage.getItem('scriptRunning');
    if (scriptRunning === 'true') {
        var classSelect = document.getElementById('ctl00_mainContent_dllCourse');
        var currentIndex = getSelectedIndex();
        var className = classSelect.options[currentIndex].text;
        downloadTextContent(className);
        var nextIndex = (currentIndex + 1) % classSelect.options.length;

        if (nextIndex !== 0) {
            setSelectedIndex(nextIndex);
        } else {
            downloadAllClasses();
            localStorage.removeItem('scriptRunning');
            localStorage.removeItem('allClassesContent');
        }
    }
})();