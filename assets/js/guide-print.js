let service;

document.addEventListener('DOMContentLoaded', async () => {
    service = new ResourceService();

    displayGeneralInformation();
    displayTableOfContents();
    displayBuildings();
    displayPresidency();
    displayHighCouncil();
    displaySpeakingAssingments();
    displayStakeConference();
})

// display
async function displayGeneralInformation()
{
  const generalInfo = await service.getGeneralInformation();

  const titleRow = generalInfo.find(row => row.Section == 'Header' && row.Key == 'Title')

  document.getElementById('title').innerText = titleRow.Value.replace('<p>','').replace('</p>','');
}

async function displayTableOfContents()
{
  const tableOfContents = await service.getTableOfContents()

  let parent = document.getElementById('toc-container')

  tableOfContents.forEach((row) => {
    const template = document.getElementById('toc-template').content.cloneNode(true);
    template.querySelector('a').innerText = row.Title;
    template.querySelector('a').href = `#${row.Anchor}`;
    template.querySelector('a').href = `${row.Anchor}.html`;
    template.querySelector('.section-name').innerText = `Section ${row.Section}`;

    parent.appendChild(template);
  })
}


    displayBuildings = async () => {
        if (!service) return;

        let buildings = await service.getBuildings();
        

        let parent = document.getElementById('buildings-container');
        parent.innerText = '';

        if ('content' in document.createElement('template')) {
            buildings.forEach(async (building) => {
                const template = document.getElementById('building-row-template').content.cloneNode(true);
                const div = template.querySelector(".building-table");

                template.querySelector('.building-name').innerText = building.Name;
                template.querySelector('.building-description').innerText = building.Address;
                template.querySelector('.map-container').innerHTML = building.MapURL;

                const mapToggle = template.querySelector('.clickable');
                const map = template.querySelector('.map-container');

                mapToggle.addEventListener('click', () => {
                    toggle(map);
                })

                this.displayWards(building.BuildingId, div);

                parent.appendChild(template);
            });
        }
    }

    displayWards = async (buildingId, parent) => {
        const highCouncil = await service.getHighCouncil();
        const wards = await service.getWards();

        const buildingWards = wards.filter(ward => {
            const isBuilding = ward.BuildingId == buildingId;
            
            return isBuilding;
        });

        buildingWards.forEach(ward => {

            const tmpl = document.getElementById('ward-row-template').content.cloneNode(true);
            const hc = highCouncil.find(hc => hc.Id === ward.HighCouncilorId);

            tmpl.querySelector('.ward-name').innerText = ward.Abbreviation;
            tmpl.querySelector('.start-time').innerText = ward.SacramentMeeting;
            tmpl.querySelector('#bishop-link').innerText = ward.Bishop;
            tmpl.querySelector('#bishop-link').href = ward.BishopProfile;
            tmpl.querySelector('#high-councilor-link').innerText = hc.Name;
            tmpl.querySelector('#high-councilor-link').href = hc.Profile;
            tmpl.querySelector('.youth-night').innerText = ward.YouthNight;

            parent.appendChild(tmpl);
        })

        return buildingWards.length > 0;        
    }


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
