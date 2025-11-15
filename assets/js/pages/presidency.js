

document.addEventListener('DOMContentLoaded', async () => {

    displayPresidency();

})

// presidency section
async function displayPresidency()
{
  const callings = await service.getCallings()

  if ('content' in document.createElement('template')) {

    let div = document.getElementById('presidency-container');
    let people = callings.filter( p => p.OrganizationId == 1);
    renderCallingRows(people, div);

    div = document.getElementById('patriarch-container');
    people = callings.filter( p => p.OrganizationId == 3);
    renderCallingRows(people, div);

    div = document.getElementById('mission-container');
    people = callings.filter( p => p.OrganizationId == 101);
    renderMissinoaryRows(people, div);

    displayPresidencyAssignments()

  }
}

function renderCallingRows(people, parent)
{
    people.forEach((person) => {
      const tmpl = document.getElementById('presidency-row-template').content.cloneNode(true);
      tmpl.querySelector('.person-name').innerText = person.Name;
      tmpl.querySelector('.person-name').href = person.Profile;
      tmpl.querySelector('div.calling-container').innerHTML = person.Calling;
      
      parent.appendChild(tmpl);
    });
}

function renderMissinoaryRows(people, parent)
{
    people.forEach((person) => {
      const tmpl = document.getElementById('missionary-row-template').content.cloneNode(true);
      tmpl.querySelector('.person-name').innerText = person.Name;
      tmpl.querySelector('div.calling-container').innerHTML = person.Calling;
      
      parent.appendChild(tmpl);
    });
}
