function toggle(selector)
{
    const element = document.querySelector(selector);

    if(element.classList.contains('hidden'))
        element.classList.remove('hidden');
    else
        element.classList.add('hidden');
}