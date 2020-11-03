const mongoose = require('mongoose');
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

//create new schema
const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        // GeoJSON point
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'

        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        // array of strings
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating Must be at lest 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg',
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGuarantee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
},
    // for relation between  "bootcamp module" and "course module"
    // "bootcamp module" is the parent of "course module".
    // i create a virtual field "coursesLink" that related with "course"
    {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

// create bootcamp slug from the name
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        replacement: '-',
        lower: true
    })
    next()
})

//geocode and create location field
BootcampSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    }

    // do not save address in database
    this.address = undefined
    next()
})

// cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function (next) {
    console.log(`BootcampRelated delete ${this._id}`)
    await this.model('Course').deleteMany({bootcampRelated: this._id})
    next()
})

// reverse populate with virtuals
// one to many
// bootcamp module is parent of course module
BootcampSchema.virtual('coursesLink', {
    ref: 'Course', // the name of module
    localField: '_id', // the name of field inside (bootcamp module)
    foreignField: 'bootcampRelated', // the name of field inside(course module)
    justOne: false
})

// "Bootcamp" est le nom de collection et en mongoDB est devenue "Bootcamps"
module.exports = mongoose.model('Bootcamp', BootcampSchema)