const mongoose = require('mongoose');
const StudentModel = mongoose.model('Student');
const SubjectModel = mongoose.model('Subject');

exports.getAll = function(req, res) {
    StudentModel.find()
        .then((students) => {
            return res.send(students);
        })
        .catch(err => {
            return res.status(400).send(err);
        })
}

exports.getOne = async function(req, res) {
    const id = req.params.id;
    try {
        const student = await StudentModel.findById(id).populate('subjects');
        
        if (!student) {
            return res.status(404).send({ err: "Student not found" });
        }

        return res.send(student);
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.createStudent = function(req, res) {
    const body = req.body;

    StudentModel.create(body, function(err, student) {
        if (!student) {
            return res.status(422).send({ "error": true });
        }

        if (err) {
            return res.status(400).send({ "error": true });
        }

        return res.send(student);
    });
}

exports.updateStudent = function(req, res) {
    const id = req.params.id;
    const body = req.body;

    StudentModel.findByIdAndUpdate(id, body,{ new: true }, function(err, student) {
        if (!student) {
            return res.status(404).send({ err: "Student not found "});
        }

        if (err) {
            return res.send({ err });
        }

        return res.send(student);
    })

}

exports.deleteStudent = function(req, res) {
    const id = req.params.id;

    StudentModel.findByIdAndDelete(id, function(err, student) {
        if (err) {
            return res.send({ err });
        }

        return res.status(204).send();
    })
}

exports.getByEmail = async function(req, res) {
    const search = req.params.search;

    if (!search) {
        let students = await StudentModel.find();

        return res.send(students);
    }

    try {
        const students = await StudentModel.find({
            email: { '$regex': search, '$options': 'i' } 
        });
        
        if (!students) {
            return res.status(404).send({ err: "Student not found" });
        }

        return res.send(students);
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.assignSubject = async function(req, res) {
    const id = req.params.id;
    const subjectId = req.body.subjectId;

    try {
        const student = await StudentModel.findById(id);
        
        if (!student) {
            return res.status(404).send({ err: "Student not found" });
        }

        if (!subjectId) {
            return res.status(422).send({ err: "Please send subject" });
        }

        const subject = await SubjectModel.findById(subjectId);

        student.subjects.push(subjectId);
        subject.student.push(id);

        await subject.save();
        const updatedStudent = await student.save();

        return res.send(updatedStudent);
    } catch (error) {
        return res.status(400).send({ error });
    }
}