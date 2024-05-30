const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let rooms = [];
let bookings = [];

// Create a room
app.post('/rooms', (req, res) => {
    const { seats, amenities, pricePerHour } = req.body;
    const room = {
        id: rooms.length + 1,
        seats,
        amenities,
        pricePerHour
    };
    rooms.push(room);
    res.json(room);
    console.log(rooms);
});

// Book a room
app.post('/bookings', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const room = rooms.find(room => room.id === roomId);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    // Check if the room is already booked at the same date and time
    const isRoomBooked = bookings.some(booking =>
        booking.roomId === roomId &&
        booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
         (endTime > booking.startTime && endTime <= booking.endTime) ||
         (startTime <= booking.startTime && endTime >= booking.endTime))
    );

    if (isRoomBooked) {
        return res.status(400).json({ message: 'Room is already booked for this date and time' });
    }

    const booking = {
        id: bookings.length + 1,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        roomName: `Room ${roomId}`,
        bookedStatus: 'Booked'
    };
    bookings.push(booking);
    res.json(booking);
    console.log(bookings)
});


// List all rooms with booked data
app.get('/rooms', (req, res) => {
    const roomsWithBookings = rooms.map(room => {
        const roomBookings = bookings.filter(booking => booking.roomId === room.id);
        return {
            roomName: `Room ${room.id}`,
            bookedStatus: roomBookings.length > 0 ? 'Booked' : 'Available',
            customerName: roomBookings.length > 0 ? roomBookings[0].customerName : '',
            date: roomBookings.length > 0 ? roomBookings[0].date : '',
            startTime: roomBookings.length > 0 ? roomBookings[0].startTime : '',
            endTime: roomBookings.length > 0 ? roomBookings[0].endTime : ''
        };
    });
    res.json(roomsWithBookings);
    console.log(roomsWithBookings);
});

// List all customers with booked data
app.get('/customers', (req, res) => {
    const customersWithBookings = bookings.map(booking => {
        return {
            customerName: booking.customerName,
            roomName: `Room ${booking.roomId}`,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        };
    });
    res.json(customersWithBookings);
    console.log(customersWithBookings);
});

// List how many times a customer has booked a room
app.get('/customer/:customerName/count', (req, res) => {
    const { customerName } = req.params;
    const bookingCount = bookings.filter(booking => booking.customerName === customerName).length;
    res.json({ customerName, bookingCount });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
