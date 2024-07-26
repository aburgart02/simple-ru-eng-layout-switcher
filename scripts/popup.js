let switchLayout = document.getElementById("switchLayoutButton");

switchLayout.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url?.startsWith("chrome://")) return undefined;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: switchLayoutAction,
    });
});


function switchLayoutAction() {
    let selection = window.getSelection();
    let desiredElement = selection.focusNode;
    const children = desiredElement.children;
    for (let i = 0; i < children.length; i++)
    {
        if (children[i].tagName === 'INPUT') {
            children[i].value = '123';
        }
    }
}