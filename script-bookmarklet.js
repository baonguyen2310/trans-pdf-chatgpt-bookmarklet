javascript:(function() {
    if (document.getElementById('txtViewerContainer')) return;

    // Tạo container chính
    var container = document.createElement('div');
    container.id = 'txtViewerContainer';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.backgroundColor = '#fff';
    container.style.padding = '10px';
    container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    container.style.zIndex = '9999';

    // Thêm nút đóng cho container chính
    var closeContainerButton = document.createElement('button');
    closeContainerButton.textContent = 'X';
    closeContainerButton.style.position = 'absolute';
    closeContainerButton.style.top = '5px';
    closeContainerButton.style.right = '5px';
    closeContainerButton.style.zIndex = '10001';
    closeContainerButton.style.background = '#f00';
    closeContainerButton.style.color = '#fff';
    closeContainerButton.style.border = 'none';
    closeContainerButton.style.borderRadius = '50%';
    closeContainerButton.style.width = '30px';
    closeContainerButton.style.height = '30px';
    closeContainerButton.style.textAlign = 'center';
    closeContainerButton.style.lineHeight = '30px';
    closeContainerButton.style.cursor = 'pointer';
    container.appendChild(closeContainerButton);

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.style.display = 'block';
    fileInput.style.marginBottom = '10px';
    container.appendChild(fileInput);

    var htmlFileInput = document.createElement('input');
    htmlFileInput.type = 'file';
    htmlFileInput.accept = '.html';
    htmlFileInput.style.display = 'block';
    htmlFileInput.style.marginBottom = '10px';
    container.appendChild(htmlFileInput);

    var pageNumberInput = document.createElement('input');
    pageNumberInput.type = 'number';
    pageNumberInput.placeholder = 'Chọn trang';
    pageNumberInput.style.display = 'block';
    pageNumberInput.style.marginBottom = '10px';
    container.appendChild(pageNumberInput);

    var viewButton = document.createElement('button');
    viewButton.textContent = 'Xem TXT';
    viewButton.style.display = 'block';
    viewButton.style.marginBottom = '10px';
    container.appendChild(viewButton);

    var viewHtmlButton = document.createElement('button');
    viewHtmlButton.textContent = 'Xem HTML';
    viewHtmlButton.style.display = 'block';
    viewHtmlButton.style.marginBottom = '10px';
    container.appendChild(viewHtmlButton);

    var translateButton = document.createElement('button');
    translateButton.textContent = 'Dịch';
    translateButton.style.display = 'block';
    translateButton.style.marginBottom = '10px';
    container.appendChild(translateButton);

    var nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.style.display = 'block';
    nextButton.style.marginBottom = '10px';
    container.appendChild(nextButton);

    var txtPopup = document.createElement('div');
    txtPopup.id = 'txtPopup';
    txtPopup.style.position = 'fixed';
    txtPopup.style.top = '10%';
    txtPopup.style.left = '10%';
    txtPopup.style.width = '80%';
    txtPopup.style.height = '80%';
    txtPopup.style.backgroundColor = '#fff';
    txtPopup.style.zIndex = '10000';
    txtPopup.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.7)';
    txtPopup.style.display = 'none';
    container.appendChild(txtPopup);

    var htmlPopup = document.createElement('div');
    htmlPopup.id = 'htmlPopup';
    htmlPopup.style.position = 'fixed';
    htmlPopup.style.top = '10%';
    htmlPopup.style.left = '10%';
    htmlPopup.style.width = '80%';
    htmlPopup.style.height = '80%';
    htmlPopup.style.backgroundColor = '#fff';
    htmlPopup.style.zIndex = '10000';
    htmlPopup.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.7)';
    htmlPopup.style.display = 'none';
    container.appendChild(htmlPopup);

    var closeButtonTxt = document.createElement('button');
    closeButtonTxt.textContent = 'X';
    closeButtonTxt.style.position = 'absolute';
    closeButtonTxt.style.top = '5px';
    closeButtonTxt.style.right = '5px';
    closeButtonTxt.style.zIndex = '10001';
    txtPopup.appendChild(closeButtonTxt);

    var closeButtonHtml = document.createElement('button');
    closeButtonHtml.textContent = 'X';
    closeButtonHtml.style.position = 'absolute';
    closeButtonHtml.style.top = '5px';
    closeButtonHtml.style.right = '5px';
    closeButtonHtml.style.zIndex = '10001';
    htmlPopup.appendChild(closeButtonHtml);

    var iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    txtPopup.appendChild(iframe);

    var img = document.createElement('img');
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    htmlPopup.appendChild(img);

    document.body.appendChild(container);

    // Tạo nút hiển thị lại container
    var showContainerButton = document.createElement('button');
    showContainerButton.textContent = '+';
    showContainerButton.style.position = 'fixed';
    showContainerButton.style.bottom = '20px';
    showContainerButton.style.right = '20px';
    showContainerButton.style.backgroundColor = '#0f0';
    showContainerButton.style.color = '#fff';
    showContainerButton.style.border = 'none';
    showContainerButton.style.borderRadius = '50%';
    showContainerButton.style.width = '30px';
    showContainerButton.style.height = '30px';
    showContainerButton.style.textAlign = 'center';
    showContainerButton.style.lineHeight = '30px';
    showContainerButton.style.cursor = 'pointer';
    showContainerButton.style.zIndex = '10000';
    showContainerButton.style.display = 'none';
    document.body.appendChild(showContainerButton);

    var textContent = '';
    var pages = [];
    var htmlPages = [];
    var pageNumber = 1;

    fileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (file) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                textContent = this.result;
                pages = textContent.split(/\n\nPage \d+:\n/).slice(1);
                pageNumberInput.max = pages.length;
                pageNumberInput.placeholder = 'Chọn trang (1-' + pages.length + ')';
                pageNumber = 1;
                pageNumberInput.value = pageNumber;
            };
            fileReader.readAsText(file);
        }
    });

    htmlFileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (file) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                var parser = new DOMParser();
                var doc = parser.parseFromString(this.result, 'text/html');
                htmlPages = Array.from(doc.querySelectorAll('img')).map(img => img.src);
            };
            fileReader.readAsText(file);
        }
    });

    viewButton.addEventListener('click', function() {
        pageNumber = parseInt(pageNumberInput.value);
        if (pageNumber > 0 && pageNumber <= pages.length) {
            var pageText = pages[pageNumber - 1];
            iframe.srcdoc = '<pre>' + pageText.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';
            txtPopup.style.display = 'block';
        }
    });

    viewHtmlButton.addEventListener('click', function() {
        pageNumber = parseInt(pageNumberInput.value);
        if (pageNumber > 0 && pageNumber <= htmlPages.length) {
            var imgSrc = htmlPages[pageNumber];
            img.src = imgSrc;
            htmlPopup.style.display = 'block';
        }
    });

    translateButton.addEventListener('click', function() {
        pageNumber = parseInt(pageNumberInput.value);
        if (pageNumber > 0 && pageNumber <= pages.length) {
            var pageText = pages[pageNumber - 1];
            sendToChatGPT(pageText);
        }
    });

    nextButton.addEventListener('click', function() {
        pageNumber = parseInt(pageNumberInput.value);
        if (pageNumber < pages.length) {
            pageNumber++;
            pageNumberInput.value = pageNumber;
            var pageText = pages[pageNumber - 1];
            sendToChatGPT(pageText);
        }
    });

    closeContainerButton.addEventListener('click', function() {
        container.style.display = 'none';
        showContainerButton.style.display = 'block';
    });

    showContainerButton.addEventListener('click', function() {
        container.style.display = 'block';
        showContainerButton.style.display = 'none';
    });

    closeButtonTxt.addEventListener('click', function() {
        txtPopup.style.display = 'none';
    });

    closeButtonHtml.addEventListener('click', function() {
        htmlPopup.style.display = 'none';
    });

    function sendToChatGPT(text) {
        const chatInput = document.querySelector('textarea[id="prompt-textarea"]');
        const sendButton = document.querySelector('button[data-testid="send-button"]');

        if (chatInput && sendButton) {
            chatInput.value = `Dịch: ${text}`;

            const inputEvent = new Event('input', { bubbles: true });
            chatInput.dispatchEvent(inputEvent);

            setTimeout(() => {
                if (!sendButton.disabled) {
                    sendButton.click();
                } else {
                    console.log("Nút gửi vẫn bị vô hiệu hóa!");
                }
            }, 500);
        } else {
            console.log("Không tìm thấy phần tử ChatGPT!");
        }
    }

    function handleKeydown(event) {
        if (event.key === 'ArrowRight') {
            nextButton.click();
        }
    }

    document.addEventListener('keydown', handleKeydown);

    let previousPCount = document.querySelectorAll('p').length;

    function clickReadAloudButton() {
        const messages = document.querySelectorAll('p');
        if (messages.length < 2) return;

        const targetMessage = messages[messages.length - 2];
        const buttonContainer = targetMessage.parentElement.parentElement.parentElement.parentElement.parentElement;

        waitForButtons(buttonContainer, () => {
            const button = buttonContainer.querySelector('button');
            if (button) {
                button.click();
            }
        });
    }

    function waitForButtons(container, callback) {
        const checkInterval = 100;

        const intervalId = setInterval(() => {
            const buttons = container.querySelectorAll('button');
            if (buttons.length > 0) {
                clearInterval(intervalId);
                callback();
            }
        }, checkInterval);
    }

    const observer = new MutationObserver(mutationsList => {
        const currentPCount = document.querySelectorAll('p').length;
        if (currentPCount > previousPCount) {
            clickReadAloudButton();
        }
        previousPCount = currentPCount;
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
})();
