

document.addEventListener('DOMContentLoaded', async () => {

    displayHighCouncil();

})

async function displayHighCouncil()
{
  const highCouncil = await service.getHighCouncil();
  const highCouncilAssignments = await service.getHighCouncilAssignments();
  const wards = await service.getWards();
    
  let parent = document.getElementById('high-council-container');
  let people = highCouncil.sort((a, b) => a.Seniority - b.Seniority)

  people.forEach((person) => {

    // get assignments
    let assignments = highCouncilAssignments.filter(hca => hca.HighCouncilId === person.Id)
        .map(a => a.Assignment)
        .reduce((final, current) => {
          if(final === '') return current
          return `${final}, ${current}`
        }, '');

    const homeWard = wards.find(ward => ward.Id === person.HomeWardId);
    const assignedWard = wards.find(ward => ward.HighCouncilorId === person.Id);

    if(assignedWard) assignments = `${assignedWard.Name}, ${assignments}`

    const tmpl = document.getElementById('high-council-row-template').content.cloneNode(true);
    tmpl.querySelector('a').innerText = `${person.Seniority}. ${person.Name} (${homeWard.Abbreviation})`;
    tmpl.querySelector('a').href = person.Profile;
    tmpl.querySelector('div.high-council-assignments').innerHTML = assignments;
    
    parent.appendChild(tmpl);
  });

}
