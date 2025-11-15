

document.addEventListener('DOMContentLoaded', async () => {

    displayPresidencyAssignments();

})

async function displayPresidencyAssignments()
{
  const callings = await service.getCallings();
  const presidencyAssignments = await service.getPresidencyAssignments();

  if ('content' in document.createElement('template')) {

    let parent = document.getElementById('presidency-assignments-container');
    let people = callings.filter( p => p.CallingId <= 103);


    people.forEach((person) => {
      const tmpl = document.getElementById('presidency-assignments-template').content.cloneNode(true);
      let assignments = presidencyAssignments.filter(a => a.PresidentId === person.CallingId);
      let ol = tmpl.querySelector('.assignments-container');

      tmpl.querySelector('.row-header').innerText = `President ${person.Name}`;
      
      assignments.forEach(assignment => {
        const li = document.createElement('li');
        li.innerText = assignment.Assignment;
        ol.appendChild(li);
      })
      
      parent.appendChild(tmpl);
    });

  }
}