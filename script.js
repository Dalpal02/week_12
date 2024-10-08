const apiUrl = 'http://localhost:3000/entities';

document.getElementById('entityForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();

    if (name) {
        await createEntity({ name });
        document.getElementById('name').value = ''; // Clear input
        fetchEntities(); // Refresh the entity list
    }
});

async function createEntity(entity) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity),
        });
        if (!response.ok) {
            throw new Error('Failed to create entity');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchEntities() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch entities');
        }
        const entities = await response.json();
        displayEntities(entities);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayEntities(entities) {
    const entityList = document.getElementById('entityList');
    entityList.innerHTML = ''; // Clear the list before displaying new items
    entities.forEach(entity => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = entity.name;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteEntity(entity.id);

        li.appendChild(deleteButton);
        entityList.appendChild(li);
    });
}

async function deleteEntity(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete entity');
        }
        fetchEntities(); // Refresh the entity list
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch entities on page load
window.onload = fetchEntities;