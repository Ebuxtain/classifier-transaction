
function classifier(input) {

    // return if input is not an array or array length is less than 1

    if (!Array.isArray(input)) {

      throw Error;

    }

    if (!input.length) {

      return { noOfGroups: 0 };

    }

 

    const newArr = [...input];

 

    // calculate age of students

    const modifiedArray = newArr.map((element) => ({

      name: element.name,

      age: calcAge(element.dob),

      regNo: element.regNo,

      dob: element.dob,

    }));

 

    // sort array by age

    const sortedArray = modifiedArray.sort(function (a, b) {

      return a.age - b.age;

    });

 

    //initialize 1st group with the first student in the sorted array

    let group = [sortedArray[0]];

    let studentGroup = [];

 

    // sort group by age difference and group length

    for (let i = 1; i < modifiedArray.length; i++) {

      if (sortedArray[i].age - group[0].age <= 5 && group.length <= 2) {

        group.push(modifiedArray[i]);

      } else {

        studentGroup.push(group);

        group = [];

        group.push(modifiedArray[i]);

      }

    }

 

    // last group

    if (group.length) {

      studentGroup.push(group);

    }

 

    // set noOfGroups key

    let output = {};

    output.noOfGroups = studentGroup.length;

 

    // format groups based on output requirement

    const groupOutput = studentGroup.map(function (group) {

      return {

        members: group.map((el) => ({

          name: el.name,

          age: el.age,

          dob: el.dob,

          regNo: el.regNo,

        })),

        oldest: group[group.length - 1].age,

        sum: group.reduce((acc, el) => {

          return acc + el.age;

        }, 0),

        regNos: group

          .map((el) => Number(el.regNo))

          .sort(function (a, b) {

            return a - b;

          }),

      };

    });

 

    // set output key for each group

    groupOutput.forEach((group, idx) => {

      let currentGroup = `group${idx + 1}`;

      // console.log(currentGroup);

      output = { ...output, [currentGroup]: group };

      console.log(output);

    });

 

    return output;

  }

 

  // function to calculate age

  function calcAge(year) {

    const date = new Date(year);

    return new Date(2019, 0, 1).getFullYear() - new Date(year).getFullYear();

  }

 

 

export default classifier;
