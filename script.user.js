// ==UserScript==
// @name         Class Information Selector
// @namespace    http://tampermonkey.net/
// @version      0.62
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
        var textContent = document.getElementById('ctl00_mainContent_lblNewSlot').innerText.trim();
        const blob = new Blob([textContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = className + '.txt';
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
        if (window.location.href === 'https://fap.fpt.edu.vn/Default.aspx') {
            localStorage.removeItem('scriptRunning');
            return;
        }

        var classSelect = document.getElementById('ctl00_mainContent_dllCourse');
        var currentIndex = getSelectedIndex();
        var className = classSelect.options[currentIndex].text;
        downloadTextContent(className);
        var nextIndex = (currentIndex + 1) % classSelect.options.length;

        if (nextIndex !== 0) {
            setSelectedIndex(nextIndex);
        } else {
            localStorage.removeItem('scriptRunning');
        }
    }
})();