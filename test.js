// const searchValue = '';
//
// const tempArray = [];
// const obj = {userid: "us-west-2:b5bd671e-a4e6-4f76-987d-a3c029500058", email: "ANDRE253@mANiME.co", firstname: "Andre", lastname: "Nguyen", datecreated: "2019-04-17T18:37:09.370Z"}
// tempArray.push(obj);
// tempArray.push(obj);
// tempArray.push(obj);
//
// const data = tempArray.filter((row) =>
//   Object.values(row).some((rowItem) => {
//     if (!rowItem) return false;
//     if (typeof rowItem == 'number')
//       return rowItem.toString().toLowerCase().indexOf(searchValue) >= 0;
//     if (typeof rowItem == 'string')
//       return rowItem.toLowerCase().indexOf(searchValue) >= 0;
//     return false;
//   })
//
// );
//
// console.log(data);

// first time club, don't feel like they fit in
// vetting a person based on background

const asyncSub = async () => {
  const test = [0, 1, 2, 3, 4];
  test.map(async item => {
    const test = new Promise(function(resolve, reject) {
      setTimeout(() => {
        console.log(item);
        resolve('success');
      }, 1000);
    });

    await test;
  });
  console.log('here');
};

asyncSub();
