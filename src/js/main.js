//Variabler
const url = "http://localhost/WebbIII/Webapp/rest.php/kurser";
const courseList = document.getElementById("courseList");

const add = document.getElementById("add");

//Eventlisteners
window.addEventListener("load", showCourses);
add.addEventListener("click", addCourse);

/*
Functions
*/

//Laddar lista med kurser
function showCourses() {
  let output = "";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.forEach(course => {
        output += `<tr>
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.progression}</td>
            <td><a target="_blank" href="${course.syllabus}">Kursplan</a></td>
            <td><input type="submit" onclick="deleteCourse(${course.id})" class="button" value="Radera"></td>

            </tr>`;
      });
      courseList.innerHTML = output;
    });
}
//Lägg till kurs via formulär
async function addCourse() {
  let code = document.getElementById("code").value;
  let name = document.getElementById("name").value;
  let progression = document.getElementById("progression").value;
  let syllabus = document.getElementById("syllabus").value;

  let jsonStr = JSON.stringify({
    code: code,
    name: name,
    progression: progression,
    syllabus: syllabus
  });

  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonStr
  })
    .then(res => res.json())
    .then(data => showCourses(data))
    .catch(err => console.log(err));
}

//Radera kurs
function deleteCourse(id) {
  let jsonStr = JSON.stringify({
    id: id
  });
  fetch(url, {
    method: "DELETE",
    mode: "cors",
    body: jsonStr
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
