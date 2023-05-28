## CLIENT ROUTES
#### Index Route

| URL | Description     | Protected                |
| :-------- | :------- | :------------------------- |
| /| Index page |  |
| *| 404 page |  |

#### User Routes

| URL | Description     | Protected                |
| :-------- | :------- | :------------------------- |
| /registro| Signup page |  |
| /inicio-sesion | Login page |  |
| /perfil| User profile page | ✅ |
| /perfil-editar/:id| User profile edit page |✅  |
| /usuarios| Users list page | |
| /usuarios/detalles/:id| User details page | ✅ |


#### Venue Routes

| URL | Description     | Protected                |
| :-------- | :------- | :------------------------- |
| /salas| Venues list page |  |
| /salas/detalles/:id | Venue details page |✅  |
| /crear-sala| New venue form page | ✅ |
| /editar-sala/:id| Edit venue form page | ✅ |


#### Event Routes


| URL | Description     | Protected                |
| :-------- | :------- | :------------------------- |
| /eventos-abiertos| Open events list page |  |
| /eventos/detalles/:id | Event details page | ✅ |
| /crear-evento| New event form page | ✅ |
| /editar-evento/:id| Edit event form page | ✅ |