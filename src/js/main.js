//Variabler
const url = "https://mallind.se/rest_api/rest.php/kurser";
const courseList = document.getElementById("courseList");

const add = document.getElementById("add-course");

//Eventlisteners
window.addEventListener("load", showCourses);
add.addEventListener("submit", addCourse);

/*
Functions
*/

//Laddar lista med kurser
function showCourses() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let output = "";

      data.forEach(course => {
        output += `<tr>
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.progression}</td>
            <td><a target="_blank" href="${course.syllabus}">Kursplan</a></td>
            <td><input type="submit" class="button" value="Radera" onclick="deleteCourse(${course.id})"></td>

            </tr>`;
      });
      courseList.innerHTML = output;
    });
}
//Lägg till kurs via formulär
function addCourse(e) {
  e.preventDefault();

  let code = document.getElementById("code").value;
  let name = document.getElementById("name").value;
  let progression = document.getElementById("progression").value;
  let syllabus = document.getElementById("syllabus").value;

  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json, text/plain, */*"
      // "Content-type": "application/json"
    },
    body: JSON.stringify({
      code: code,
      name: name,
      progression: progression,
      syllabus: syllabus
    })
  })
    .then(res => res.json())
    .then(data => showCourses(data))
    .catch(err => console.log(err));
  document.forms["add-course"].reset();
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
    .then(data => showCourses(data))
    .catch(err => console.log(err));
}
