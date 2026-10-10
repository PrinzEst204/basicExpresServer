import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the Express application
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Define a route: when someone visits the homepage, send them a greeting
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to my first Express server!');
});


app.get('/about', (req: Request, res: Response) => {
    res.send('My name is prinz, a software developer!');
});

app.get('/project', (req: Request, res: Response) => {
    res.send('This is my project page!');
});

app.get('/testimonial', (req: Request, res: Response) => {
    res.send('This is my testimonial!');
});

//Motivation array and route
const motivations : string[] = [
    "an unexamined life is not worth living. ",
    "Keep going, you are closer than you think.",
    "Dont give up on your dreams.",
    "Your future self will thank you.",
    "Consistency beats perfection."
];

app.get("/motivation", (req, res) => {
    const randomIndex = 
    Math.floor(Math.random() *
   motivations.length);

   res.send(motivations[randomIndex]);
});

//Route for birthday, full year, month, and day.

app.post("/birthday", (req, res) => {
    const { day, month } = req.body;

    const today = new Date()
    today.setHours(0,0,0,0)
    
    const currentYear = today.getFullYear( )

        let birthday = new Date ( currentYear, month - 1, day )

        if (
            today.getDate() === day &&
            today.getMonth() === month - 1
        ) {
           return res.send(" Happy Birthday! Have an amazing day!")
        }

        if ( birthday < today ){
            birthday = new Date( currentYear + 1, month - 1, day)
        }

        const difference : number =  birthday.getTime() - today.getTime();

        const daysRemaining = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );
       
        res.send( `Your birthday is in ${daysRemaining} days!`);
});



// Start the server and begin listening for requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});