// ==UserScript==
// @name         Class Information Selector
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Download the class timetable
// @author       iam.slightlywind@themajorones.dev
// @match        https://fap.fpt.edu.vn/*
// ==/UserScript==

(function () {
    'use strict';

    // Function to get the index of the currently selected option
    function getSelectedIndex() {
        var classSelect = document.getElementById('ctl00_mainContent_dllCourse');
        return classSelect.selectedIndex;
    }

    // Function to set the selected index of the class
    function setSelectedIndex(index) {
        var classSelect = document.getElementById('ctl00_mainContent_dllCourse');
        classSelect.selectedIndex = index;
        classSelect.dispatchEvent(new Event('change'));
    }

    // Function to download text content
    function downloadTextContent(className) {
        // Get the text content of the element
        var textContent = document.getElementById('ctl00_mainContent_lblNewSlot').innerText.trim();

        // Create a Blob from the text content
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Create a link element
        const link = document.createElement('a');

        // Set the link's attributes
        link.href = URL.createObjectURL(blob);
        link.download = className + '.txt';

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    }

    // Create the button
    var customButton = document.createElement('button');
    customButton.innerHTML = 'Select Next Class';
    customButton.style.position = 'fixed';
    customButton.style.top = '10px';
    customButton.style.left = '10px';
    customButton.addEventListener('click', function () {
        // Get the current index
        var classSelect = document.getElementById('ctl00_mainContent_dllCourse');
        var currentIndex = getSelectedIndex();

        // Get the class name
        var className = classSelect.options[currentIndex].text;

        // Download the text content
        downloadTextContent(className);

        // Calculate the next index
        var nextIndex = (currentIndex + 1) % classSelect.options.length;

        // Check if it's the last class
        if (nextIndex !== 0) {
            // Select the next class
            setSelectedIndex(nextIndex);
        }
    });

    // Append the button to the body
    document.body.appendChild(customButton);
})();