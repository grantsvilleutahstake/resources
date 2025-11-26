function toggle(element)
{
    if(element.classList.contains('hidden'))
        element.classList.remove('hidden');
    else
        element.classList.add('hidden');
}

function parseDate(str) {
  const [month, day, year] = str.split('/').map(Number);
  return new Date(year, month - 1, day);
}