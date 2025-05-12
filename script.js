document.addEventListener("DOMContentLoaded", () => {
    const showButton = document.getElementById("btn");
    const showDialog = document.getElementById("dialog");
    const submitButton = document.getElementById("submit");
    const cancelIcon = document.getElementById("cancelIcon");

    showButton.addEventListener("click", () => {
        showDialog.showModal();
    });

    submitButton.addEventListener("click", () => {
        const titleInput = document.getElementById("title");
        const authorInput = document.getElementById("author");
        const pagesInput = document.getElementById("pages");

        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pagesInput.value;

        if (title === "") {
            titleInput.style.borderColor = "red";
        } else if (author === "") {
            authorInput.style.borderColor = "red";
        } else if (isNaN(pages) || pages === "") {
            pagesInput.style.borderColor = "red";
        } else {
            // Create new display block for each entry
            createDisplayBlock(title, author, pages);

            // Clear the input fields
            titleInput.value = "";
            authorInput.value = "";
            pagesInput.value = "";

            cancel();
            updateStatistics();
            showDialog.close();
        }
    });

    function createDisplayBlock(title, author, pages) {
        const displayContainer = document.querySelector(".display");

        // Create new elements
        const newDiv = document.createElement("div");
        //assign a class to the div
        newDiv.className = 'grid';
        const newTitleParagraph = document.createElement("p");
        const newAuthorParagraph = document.createElement("p");
        const newPagesParagraph = document.createElement("p");

        const buttonRead = document.createElement("button");
        const buttonDelete = document.createElement("button");

        // Set content and append to container
        newTitleParagraph.textContent = `Title: ${title}`;
        newAuthorParagraph.textContent = `Author: ${author}`;
        newPagesParagraph.textContent = `Pages: ${pages}`;

        buttonRead.textContent = `Not read`;
        buttonRead.style.backgroundColor = "red";
        buttonRead.style.color = "white";

        buttonDelete.textContent = `Delete`;
        buttonDelete.style.backgroundColor = "black";
        buttonDelete.style.color = "white";

        newDiv.appendChild(newTitleParagraph);
        newDiv.appendChild(newAuthorParagraph);
        newDiv.appendChild(newPagesParagraph);
        newDiv.appendChild(buttonRead);
        newDiv.appendChild(buttonDelete);

        // Append new display block to the container
        displayContainer.appendChild(newDiv);

        deleteButton(buttonDelete, newDiv);
        statRead(buttonRead);

        updateStatistics();
    }

    function deleteButton(buttonDelete, newDiv) {
        buttonDelete.addEventListener("click", () => {
            newDiv.remove();
            updateStatistics();
        });
    }

    function statRead(buttonRead) {
        buttonRead.addEventListener("click", () => {
            buttonRead.textContent = buttonRead.textContent === "Not read" ? "Already Read" : "Not read";

            if (buttonRead.textContent === "Not read") {
                buttonRead.style.backgroundColor = "red";
                buttonRead.style.color = "white";
            } else {
                buttonRead.style.backgroundColor = "green";
                buttonRead.style.color = "white";
            }

            updateStatistics();
        });
    }

    function cancel() {
        cancelIcon.addEventListener("click", () => {
            showDialog.close();
        });
    }

    function calculateBooks() {
        const quantityP = document.querySelectorAll(".grid").length;
        const quantityR = document.querySelectorAll(".grid button[style*='green']").length;
        const quantityL = quantityP - quantityR;

        return { quantityP, quantityR, quantityL };
    }

    function statAside(quantityP, quantityR, quantityL) {
        const displayAside = document.getElementById("aside");

        // create new div
        const statDiv = document.createElement("div");
        statDiv.className = 'div_aside';
        const statP = document.createElement("p");
        const statR = document.createElement("p");
        const statL = document.createElement("p");

        const buttonDelAll = document.createElement("button");
        buttonDelAll.className = 'buttondel';

        statP.textContent = `Total number of books present: ${quantityP}`;
        statR.textContent = `Total number of books read: ${quantityR}`;
        statL.textContent = `Total number of books left: ${quantityL}`;

        buttonDelAll.textContent = `Delete All`;
        buttonDelAll.style.color = "white";
        buttonDelAll.style.backgroundColor = "red";

        statDiv.appendChild(statP);
        statDiv.appendChild(statR);
        statDiv.appendChild(statL);
        statDiv.appendChild(buttonDelAll);

        // Clear existing content in the aside
        displayAside.innerHTML = '';

        displayAside.appendChild(statDiv);
        deleteEverything(buttonDelAll);
    }

    function updateStatistics() {
        // Call calculateBooks to get the quantities and pass them to statAside
        const { quantityP, quantityR, quantityL } = calculateBooks();
        statAside(quantityP, quantityR, quantityL);
    }

    function deleteEverything(buttonDelAll) {
        buttonDelAll.addEventListener("click", () => {
            const displayContainer = document.querySelector(".display");
            // Remove all books in the display container
            displayContainer.innerHTML = "";
            updateStatistics(); // Update statistics after deletion
        });
    }

    updateStatistics();
});

