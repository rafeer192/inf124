/* 
  Validates input to match form in common/index.js
  Only for password and email
  6-28 characters, required
*/
const { formSchema } = require('../common');

const validateForm = (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch(err => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then(valid => {
      if (valid) {
        console.log("form is good");
      }
    });
};

module.exports = validateForm;
