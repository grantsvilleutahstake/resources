let resourceService;

document.addEventListener('DOMContentLoaded', () => {
    resourceService = new ResourceService();

    loadPresidency();
    loadOrganizations();
})

async function loadPresidency()
{
    const presidency = await resourceService.getPresidency();

    const parsedData = Papa.parse(presidency, {
      header: true, // Assumes first row is headers
      skipEmptyLines: true,
      dynamicTyping: true // Auto-convert numbers/dates if possible
    }).data;
    
    console.log(parsedData);
    
}

async function loadOrganizations()
{
    const data = await resourceService.getOrganizations();

    const parsedData = Papa.parse(data, {
      header: true, // Assumes first row is headers
      skipEmptyLines: true,
      dynamicTyping: true // Auto-convert numbers/dates if possible
    }).data;
    
    console.log(parsedData);
    
}