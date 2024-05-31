# Hall-Booking-task - Write API for HALL BOOKING APPLICATION 
-- Created the Express Server and Endpoints 
-- Used : Local variable to store Data  ( Rooms and Booking ) 
-- Specific : Booking app will not allow booking an already booked room on the same date and                   time 


https://documenter.getpostman.com/view/34780783/2sA3Qv8qWP#09fb481b-50dd-4e04-80ad-934cd8be64e2  

note:
-- Use JSON FILE DATA 

Endpoints 
1. Creating a Room with - Number of Seats available, amenities in the room,Price for 1 Hour
   http://localhost:3000/rooms  - POST METHOD
   
2. Booking room with - Customer Name, date,starttime , End Time , Room Id
   http://localhost:3000/bookings   - POST METHOD
   
3. List all rooms with Booked Data with - Room Name, Booked Status, CustomerName, date , start       time , end time
   http://localhost:3000/rooms  - GET METHOD 
   
4. List all customer with booked data with - Customer name, room name , date, start and end time
   http://localhost:3000/customers  - GET METHOD

5. List how many times a customer has booked the room with - Customer name , Room name , date,      start Time , End Time , Booking Id, Bookng date, Booking Status
   http://localhost:3000/customer/:customerName/count


