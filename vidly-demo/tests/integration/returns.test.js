const moment = require('moment');
const request = require('supertest');
const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const {Movie} = require('../../models/movie');
const mongoose = require('mongoose');


describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    const exec = async () => {
        return await request(server).post('/api/returns')
                              .set('x-auth-token', token)
                              .send({ customerId, movieId});
    };

    beforeEach( async () => {
        server = require('../../index');
        customerId  = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token  = new User().getAuthToken();

        movie = new Movie({
            _id: movieId,
            title: 'movie title',
            dailyRentalRate: 2,
            genre: { name: '12345'},
            numberInStock: 10
        });
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: 'anas-aljundi',
                phone: 581897790
            },
            movie:  {
                _id: movieId,
                title: 'movie title',
                dailyRentalRate: 2
            }
        });
        await rental.save();
 });
    afterEach(async () => {
        await server.close();
        await Rental.remove({}); 
        await Movie.remove({});
    });

    it('should return 401 if the user not logged in', async () => {
        token = '';
        
        const result = await exec();
        expect(result.status).toBe(401);
    });

    it('should return 400 if the customerId is not provided', async () => {
        customerId= '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 400 if the movieId is not provided', async () => {
        movieId='';

        const res =  await exec();

        expect(res.status).toBe(400);
    });

     it('should return 404 if no rental found for the customer/movie', async () => {
        await Rental.remove({});

        const res = await exec();
        expect(res.status).toBe(404);
    });

    it('should return 400 if the rental already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200  if the we have a valid request', async () => {

        const res = await exec();
        expect(res.status).toBe(200);
    });

    it('should return Not Null if the date returned set', async () => {
        
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDb.dateReturned;
        expect(diff).toBeLessThan(10 * 1000);
    });

    it('should set the rental fee if input  is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();

        const res = await exec();
        const  rentalInDb = await Rental.findById(rental._id);
        expect(rentalInDb.rentalFee).toBeDefined();
    });

    it('should increase the movie stock if input  is valid', async () => {
        const res = await exec();

        const  movieInDb = await Movie.findById(movieId);
        expect(movieInDb.numberInStock).toBe(movie.numberInStock  + 1);
    });

    it('should return the rental if the input is valid', async () => {
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        expect(res.body).toHaveProperty('dateOut');
        expect(res.body).toHaveProperty('dateReturned');
        expect(res.body).toHaveProperty('rentalFee');
        expect(res.body).toHaveProperty('customer');
        expect(res.body).toHaveProperty('movie');
        
        //OR You Can write another way
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut', 'dateReturned','rentalFee', 'customer', 'movie'])
        );
    }); 
});