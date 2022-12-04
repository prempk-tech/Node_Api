const express = require('express');
const StudentModel = require('../models/student');
const router = express.Router();
var multer = require('multer');
var csv = require('csvtojson');

var upload = multer({ dest: 'uploads/' });

//Post Method
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        csv()
            .fromFile(req.file.path)
            .then(async (jsonObj) => {
                console.log("new", jsonObj)
                var stuData = [];
                for (var i = 0; i < jsonObj.length; i++) {
                    var obj = {};
                    obj.student_id = jsonObj[i]['Id'];
                    obj.student_name = jsonObj[i]['Name'];
                    obj.student_age = jsonObj[i]['Age'];
                    obj.student_mark1 = jsonObj[i]['Mark1'];
                    obj.student_mark2 = jsonObj[i]['Mark2'];
                    obj.student_mark3 = jsonObj[i]['Mark3'];
                    stuData.push(obj);
                }
                var result = await StudentModel.insertMany(stuData);
                res.status(200).json({ "status": 200, "data": result, "message": "Added Successfully", "error": false })

            }).catch((error) => {
                throw new Error('failure')
            })

    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
});

//Get all Method
router.get('/students/:id/result', async (req, res) => {
    try {
        var id = req.params.id;
        const data = await StudentModel.findOne({ student_id: id });
        res.status(200).json({ "status": 200, "data": data, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.get('/students', async (req, res) => {
    try {
        var status = req.query.resultStatus;
        var passMark = 35;
        const allData = await StudentModel.find();
        let passedStudent = [];
        allData.forEach(element => {
            if(status == 'passed'){
                if (element.student_mark1 > passMark && element.student_mark2 > passMark && element.student_mark3 > passMark)
                    passedStudent.push(element);
            }else{
                if (element.student_mark1 < passMark || element.student_mark2 < passMark || element.student_mark3 < passMark)
                    passedStudent.push(element);
            }
        });
        res.status(200).json({ "status": 200, "data": passedStudent, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

module.exports = router;