let service;
let currentYear

document.addEventListener('DOMContentLoaded', async () => {
    service = new ResourceService();

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
// end presidency section

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

async function displaySpeakingAssingments()
{
  const generalInfo = await service.getGeneralInformation();

  const row = generalInfo.find(info => info.Section === 'Speaking' && info.Key === 'Instructions');

  if(!row) return;

  document.getElementById('speaking-instructions-header').innerText = row.Key;

  document.getElementById('speaking-instructions').innerHTML = marked.parse(row.Value);

}

async function displayStakeConference()
{
  //load instructions
  const generalInfo = await service.getGeneralInformation();

  const row = generalInfo.find(info => info.Section === 'Stake Conference' && info.Key === 'Instructions');

  if(!row) return;

  document.getElementById('stake-conference-header').innerText = row.Key;

  document.getElementById('stake-conference-instructions').innerHTML = marked.parse(row.Value);

  // load grid
  const stakeConference = await service.getStakeConference();

  let parent = document.getElementById('stake-conference-container');

  stakeConference.forEach((row) => {

    const template = document.getElementById('stake-conference-template').content.cloneNode(true);
    template.querySelector('.stake-conference-header').innerText = row.Date;
    template.querySelector('.presiding-authority').innerText = row.Authority;
    template.querySelector('.shelley-lane').innerText = row.ShelleyLane;
    template.querySelector('.church-street').innerText = row.ChurchStreet;
    template.querySelector('.durfee').innerText = row.Chairs;
    
    parent.appendChild(template);
  });

}
