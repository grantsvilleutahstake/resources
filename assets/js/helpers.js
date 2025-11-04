function toggle(element)
{
    if(element.classList.contains('hidden'))
        element.classList.remove('hidden');
    else
        element.classList.add('hidden');
}