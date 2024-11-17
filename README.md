# Nilepaths
My Alu repository

<li><a href="{{ url_for('book_lab_tests') }}">Book Lab Tests</a></li>









  <main>
    <section class="booking-section">
      <h2>Book an Appointment</h2>
      {% if success %}
      <p>Your appointment has been booked successfully!</p>
      {% endif %}
      <form id="appointmentForm" action="{{ url_for('book_appointment') }}" method="POST">
        <label for="serviceType">Select Service Type:</label>
        <select id="serviceType" name="serviceType">
          <option value="General Consultation">General Consultation</option>
          <option value="Dental Checkup">Dental Checkup</option>
          <option value="Eye Exam">Eye Exam</option>
          <option value="Cardiology Consultation">Cardiology Consultation</option>
          <option value="Physical Therapy">Physical Therapy</option>
        </select>
        
        <label for="date">Preferred Date:</label>
        <input type="date" id="date" name="date" required>
        
        <label for="time">Preferred Time:</label>
        <input type="time" id="time" name="time" required>
        
        <label for="location">Location:</label>
        <input type="text" id="location" name="location" required>
        
        <button type="submit" class="submit-btn">Book Appointment</button>
      </form>
    </section>
  </main>














  <div class="container">
    <h1>Book Appointment with a Doctor</h1>
    <form target="_blank" action="https://formsubmit.co/ajangcholaguer98@gmail.com" method="POST">
      <!-- Select Doctor -->
      <div class="form-group">
        <label for="doctor-select">Choose a Doctor:</label>
        <select name="doctor" id="doctor-select" class="form-control" required>
          <option value="">Select a Doctor</option>
          <option value="Dr. John Doe">Dr. John Doe (Cardiologist)</option>
          <option value="Dr. Sarah Smith">Dr. Sarah Smith (Dermatologist)</option>
          <option value="Dr. Michael Brown">Dr. Michael Brown (Neurologist)</option>
          <option value="Dr. Emma Lee">Dr. Emma Lee (Pediatrician)</option>
        </select>
      </div>
      
      <div class="form-group">
        <div class="form-row">
          <div class="col">
            <input type="text" name="name" class="form-control" placeholder="Full Name" required>
          </div>
          <div class="col">
            <input type="email" name="email" class="form-control" placeholder="Email Address" required>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <div class="form-row">
          <div class="col">
            <input type="date" name="appointment_date" class="form-control" placeholder="Appointment Date" required>
          </div>
          <div class="col">
            <input type="time" name="appointment_time" class="form-control" placeholder="Appointment Time" required>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <input type="text" name="location" class="form-control" placeholder="Location" required>
      </div>
  
      <div class="form-group">
        <textarea placeholder="Your Message" class="form-control" name="message" rows="5" required></textarea>
      </div>
  
      <button type="submit" class="btn btn-lg btn-dark btn-block">Book Appointment</button>
    </form>
  </div>





















  
# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'ajangcholaguer98@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'guij aytb xayu qwmt'  # Your generated app password
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@gmail.com'

mail = Mail(app)

# Dictionary mapping doctor names to their respective email addresses
DOCTORS_EMAILS = {
    'Dr. Smith': 'a.deng3@alustudent.com',
    'Dr. Johnson': 'ajangdeng1000@gmail.com',
    'Dr. Williams': 'malokajith5@gmail.com',
    'Dr. Brown': 'bulajak196@gmail.com',
    'Dr. Taylor': 'dengajang1516@gmail.com'
}

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()

    # Extract data from the request
    name = data.get('name')        # New: User's name
    age = data.get('age')          # New: User's age
    doctor = data.get('doctor')    # Get the selected doctor's name
    user_email = data.get('email') # Get the user's email
    location = data.get('location')
    date = data.get('date')
    time = data.get('time')
    booking_details = data.get('details')

    # Get the email of the selected doctor
    doctor_email = DOCTORS_EMAILS.get(doctor)

    if not doctor_email:
        return jsonify({"success": False, "message": "Invalid doctor selected"}), 400

    # Create the email message to send to the doctor
    msg = Message(
        subject="New Appointment Booking",
        recipients=[doctor_email],  # Send the email to the doctor's email
        body=(
            f"New appointment booking from {name} (Age: {age}).\n\n"
            f"Email: {user_email}\n"
            f"Details: {booking_details}\n"
            f"Date: {date}\n"
            f"Time: {time}\n"
            f"Location: {location}\n"
        )
    )

    try:
        # Send email to the selected doctor
        mail.send(msg)
        return jsonify({"success": True, "message": "Email sent to doctor successfully"}), 200
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return jsonify({"success": False, "message": "Failed to send email"}), 500












from flask import Flask, render_template, redirect, url_for, request, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Appointment  # Assuming these models are defined in 'models.py'
from datetime import datetime

from flask import Flask, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db.init_app(app)

# Create tables before the first request
@app.before_request
def create_tables():
    if not hasattr(create_tables, 'has_run'):
        db.create_all() 
        create_tables.has_run = True

# 1. Index Route (Home Page)
@app.route('/')
def index():
    
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']

        # Check if the email is already in the database
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            flash('Email is already registered. Please use a different email or log in.', 'danger')
            return redirect(url_for('register'))
        
        # If email is not found, continue with registration
        name = request.form['name']
        dob_str = request.form['dob']
        dob = datetime.strptime(dob_str, '%Y-%m-%d').date()  # Convert string to date
        county = request.form['county']
        password = generate_password_hash(request.form['password'], method='pbkdf2:sha256')
        
        new_user = User(name=name, email=email, dob=dob, county=county, password=password)
        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful! Please log in to continue.', 'success')
        return redirect(url_for('login'))  # Redirect to login after successful registration

    return render_template('register.html')


# 3. Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Login failed. Check your credentials.', 'danger')
    
    return render_template('login.html')

# 4. Dashboard Route (User Dashboard)
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash('Please log in to access the dashboard.', 'warning')
        return redirect(url_for('login'))

    user = db.session.get(User, session['user_id'])
    return render_template('dashboard.html', user=user)

# 5. Admin Dashboard Route
@app.route('/admin_dashboard')
def admin_dashboard():
    if 'user_id' not in session:
        flash('Please log in as admin.', 'warning')
        return redirect(url_for('login'))
    
    # Add admin validation here
    return render_template('admin-dashboard.html')

# 6. Clinic Finder Route
@app.route('/clinic_finder')
def clinic_finder():
    if 'user_id' not in session:
        flash('Please log in to find clinics.', 'warning')
        return redirect(url_for('login'))
    
    return render_template('clinic-finder.html')

# 7. Disease Information Route
@app.route('/disease_info')
def disease_info():
    if 'user_id' not in session:
        flash('Please log in to search disease information.', 'warning')
        return redirect(url_for('login'))
    
    return render_template('disease-info.html')

# 8. Book Appointment Route
@app.route('/book_appointment', methods=['GET', 'POST'])
def book_appointment():
    if 'user_id' not in session:
        flash('Please log in to book an appointment.', 'warning')
        return redirect(url_for('login'))

    if request.method == 'POST':
        service_type = request.form['serviceType']
        date = datetime.strptime(request.form['date'], '%Y-%m-%d').date()
        time = datetime.strptime(request.form['time'], '%H:%M').time()
        location = request.form['location']
        user_id = session['user_id']

        new_appointment = Appointment(service_type=service_type, date=date, time=time, location=location, user_id=user_id)
        db.session.add(new_appointment)
        db.session.commit()

        flash('Appointment booked successfully!', 'success')
        return redirect(url_for('dashboard'))
    
    return render_template('book-appointment.html')

# Logout Route
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))




# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'ajangcholaguer98@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'guij aytb xayu qwmt'  # Your generated app password
app.config['MAIL_DEFAULT_SENDER'] = 'ajangcholaguer98@gmail.com'

mail = Mail(app)

# Dictionary mapping doctor names to their respective email addresses
DOCTORS_EMAILS = {
    'Dr. Smith': 'a.deng3@alustudent.com',
    'Dr. Johnson': 'ajangdeng1000@gmail.com',
    'Dr. Williams': 'malokajith5@gmail.com',
    'Dr. Brown': 'bulajak196@gmail.com',
    'Dr. Taylor': 'dengajang1516@gmail.com'
}

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()

    # Extract data from the request
    name = data.get('name')        # New: User's name
    age = data.get('age')          # New: User's age
    doctor = data.get('doctor')    # Get the selected doctor's name
    user_email = data.get('email') # Get the user's email
    location = data.get('location')
    date = data.get('date')
    time = data.get('time')
    booking_details = data.get('details')

    # Get the email of the selected doctor
    doctor_email = DOCTORS_EMAILS.get(doctor)

    if not doctor_email:
        return jsonify({"success": False, "message": "Invalid doctor selected"}), 400

    # Create the email message to send to the doctor
    msg_to_doctor = Message(
        subject="New Appointment Booking",
        recipients=[doctor_email],  # Send the email to the doctor's email
        body=(
            f"New appointment booking from {name} (Age: {age}).\n\n"
            f"Email: {user_email}\n"
            f"Details: {booking_details}\n"
            f"Date: {date}\n"
            f"Time: {time}\n"
            f"Location: {location}\n"
        )
    )

    # Create the email message to send to the app's email
    msg_to_app = Message(
        subject="New Appointment Booking Copy",
        recipients=[app.config['MAIL_USERNAME']],  # Send the email to the app's email
        body=(
            f"New appointment booking from {name} (Age: {age}).\n\n"
            f"Email: {user_email}\n"
            f"Details: {booking_details}\n"
            f"Date: {date}\n"
            f"Time: {time}\n"
            f"Location: {location}\n"
        )
    )

    try:
        # Send email to the selected doctor
        mail.send(msg_to_doctor)
        # Send a copy to the app's email
        mail.send(msg_to_app)
        return jsonify({"success": True, "message": "Email sent to doctor and app email successfully"}), 200
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return jsonify({"success": False, "message": "Failed to send email"}), 500


if __name__ == '__main__':
    app.run(debug=True)







































































# APPS CODE

from flask import Flask, render_template, redirect, url_for, request, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Appointment  # Assuming these models are defined in 'models.py'
from datetime import datetime

from flask import Flask, request, jsonify
from flask_mail import Mail, Message

import requests


# reset password
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from werkzeug.security import generate_password_hash, check_password_hash




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db.init_app(app)



# Create tables before the first request
@app.before_request
def create_tables():
    if not hasattr(create_tables, 'has_run'):
        db.create_all() 
        create_tables.has_run = True

# 1. Index Route (Home Page)
@app.route('/')
def index():
    
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']

        # Check if the email is already in the database
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            flash('Email is already registered. Please use a different email or log in.', 'danger')
            return redirect(url_for('register'))
        
        # If email is not found, continue with registration
        name = request.form['name']
        dob_str = request.form['dob']
        dob = datetime.strptime(dob_str, '%Y-%m-%d').date()  # Convert string to date
        county = request.form['county']
        password = generate_password_hash(request.form['password'], method='pbkdf2:sha256')
        
        new_user = User(name=name, email=email, dob=dob, county=county, password=password)
        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful! Please log in to continue.', 'success')
        return redirect(url_for('login'))  # Redirect to login after successful registration

    return render_template('register.html')


# 3. Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Login failed. Check your credentials.', 'danger')
    
    return render_template('login.html')

# 4. Dashboard Route (User Dashboard)
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash('Please log in to access the dashboard.', 'warning')
        return redirect(url_for('login'))

    user = db.session.get(User, session['user_id'])
    return render_template('dashboard.html', user=user)

# 5. Admin Dashboard Route
# @app.route('/symptom_checker')
# def symptom_checker():
#     if 'user_id' not in session:
#         flash('Please log in as admin.', 'warning')
#         return redirect(url_for('login'))
    
#     # Add admin validation here
#     return render_template('symptom_checker.html')

# 6. Clinic Finder Route
@app.route('/clinic_finder')
def clinic_finder():
    
    if 'user_id' not in session:
        flash('Please log in to find clinics.', 'warning')
        return redirect(url_for('login'))
    
    return render_template('clinic-finder.html')

# 7. Disease Information Route
@app.route('/disease_info')
def disease_info():
    if 'user_id' not in session:
        flash('Please log in to search disease information.', 'warning')
        return redirect(url_for('login'))
    
    return render_template('disease-info.html')

# 8. Book Appointment Route
@app.route('/book_appointment', methods=['GET', 'POST'])
def book_appointment():
    if 'user_id' not in session:
        flash('Please log in to book an appointment.', 'warning')
        return redirect(url_for('login'))

    if request.method == 'POST':
        service_type = request.form['serviceType']
        date = datetime.strptime(request.form['date'], '%Y-%m-%d').date()
        time = datetime.strptime(request.form['time'], '%H:%M').time()
        location = request.form['location']
        user_id = session['user_id']

        new_appointment = Appointment(service_type=service_type, date=date, time=time, location=location, user_id=user_id)
        db.session.add(new_appointment)
        db.session.commit()

        flash('Appointment booked successfully!', 'success')
        return redirect(url_for('dashboard'))
    
    return render_template('book-appointment.html')

# Logout Route
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))






# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'ajangcholaguer98@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'guij aytb xayu qwmt'  # Your generated app password
app.config['MAIL_DEFAULT_SENDER'] = 'ajangcholaguer98@gmail.com'

mail = Mail(app)

# Dictionary mapping doctor names to their respective email addresses
DOCTORS_EMAILS = {
    'Dr. Smith': 'a.deng3@alustudent.com',
    'Dr. John': 'ajangdeng1000@gmail.com',
    'Dr. Williams': 'malokajith5@gmail.com',
    'Dr. Timothy': 'bulajak196@gmail.com',
    'Dr. Aaron': 'dengajang1516@gmail.com'
}

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()

    # Extract data from the request
    name = data.get('name')        # New: User's name
    age = data.get('age')          # New: User's age
    doctor = data.get('doctor')    # Get the selected doctor's name
    user_email = data.get('email') # Get the user's email
    location = data.get('location')
    date = data.get('date')
    time = data.get('time')
    booking_details = data.get('details')

    # Get the email of the selected doctor
    doctor_email = DOCTORS_EMAILS.get(doctor)

    if not doctor_email:
        return jsonify({"success": False, "message": "Invalid doctor selected"}), 400

    # Create the email message to send to the doctor
    msg_to_doctor = Message(
        subject="New Appointment Booking",
        recipients=[doctor_email],  # Send the email to the doctor's email
        body=(
            f"New appointment booking from {name} (Age: {age}).\n\n"
            f"Email: {user_email}\n"
            f"Details: {booking_details}\n"
            f"Date: {date}\n"
            f"Time: {time}\n"
            f"Location: {location}\n"
        )
    )

    # Create the email message to send to the app's email
    msg_to_app = Message(
        subject="New Appointment Booking Copy",
        recipients=[app.config['MAIL_USERNAME']],  # Send the email to the app's email
        body=(
            f"New appointment booking from {name} (Age: {age}).\n\n"
            f"Email: {user_email}\n"
            f"Details: {booking_details}\n"
            f"Date: {date}\n"
            f"Time: {time}\n"
            f"Location: {location}\n"
        )
    )

    # Create the email message to send to the user's email
    msg_to_user = Message(
        subject="Your Appointment Booking Confirmation",
        recipients=[user_email],  # Send the email to the user's email
        body=(
            f"Thank you for booking an appointment, {name}.\n\n"
            f"Details:\n"
            f"Doctor: {doctor}\n"
            f"Date: {date}\n"
            f"Time: {time}\n"
            f"Location: {location}\n"
            f"Additional Details: {booking_details}\n\n"
            "Please keep this confirmation for your records."
        )
    )

    try:
        # Send email to the selected doctor
        mail.send(msg_to_doctor)
        # Send a copy to the app's email
        mail.send(msg_to_app)
        # Send a copy to the user's email
        mail.send(msg_to_user)
        return jsonify({"success": True, "message": "Emails sent to doctor, app, and user successfully"}), 200
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return jsonify({"success": False, "message": "Failed to send email"}), 500
    










@app.route('/symptom_checker', methods=['GET', 'POST'])
def symptom_checker():
    diagnosis = None
    if request.method == 'POST':
        symptoms = request.form['symptoms']
        
        # Set up the API endpoint and headers
        url = "https://healthy.p.rapidapi.com/symptoms/clinicalstudies"
        headers = {
            "x-rapidapi-host": "healthy.p.rapidapi.com",
            "x-rapidapi-key": "efb2ce9037msh15a2626031ea558p1bdd93jsn098321662a81"  # replace with actual key
        }
        
        # Make a GET request to the API endpoint
        response = requests.get(url, headers=headers)
        
        # Debugging: Print the response details
        print("Status Code:", response.status_code)
        print("Response Text:", response.text)
        
        if response.status_code == 200:
            # Use the response as the diagnosis (customize based on actual API structure)
            diagnosis = response.json().get('message', 'Diagnosis data not available')
        else:
            diagnosis = "Error retrieving diagnosis. Please try again later."

    return render_template('symptom_checker.html', diagnosis=diagnosis)




if __name__ == '__main__':
    app.run(debug=True)

































# index

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NilePath Labs - Home</title>

  <link rel="icon" href="{{ url_for('static', filename='images/Nilepath-removebg-preview.png') }}">

  <link rel="stylesheet" href="{{ url_for('static', filename='css/home.css') }}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Edu+VIC+WA+NT+Beginner:wght@400..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
</head>
<body>

  <!-- Navigation Bar -->
  <nav class="navbar">
    <!-- Logo Section -->
    <div class="logo">
        <img src="{{ url_for('static', filename='images/Nilepath-removebg-preview.png') }}" alt="Logo">
    </div>

    <!-- Navbar Links -->
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about-us">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#testimonies">Testimonies</a></li>
        <li><a href="#contact">Contact</a></li>
    
    </ul>

    <!-- Search, Contact Info, and Buttons -->
    <div class="search-contact">
        <input type="text" placeholder="Search...">
        <div class="contact-info">
          <span>+ (211) 925851806</span>
          <span>info@nilepathlabs.com</span>
      </div>
        <div class="buttons">
       
            <form action="{{ url_for('login') }}">
                <button type="submit">Login</button>
            </form>
            <form action="{{ url_for('register') }}">
                <button type="submit">Register</button>
            </form>
        
        </div>
</nav>

  <section id="hero" style="background-image: url('{{ url_for('static', filename='images/labimportant.jpg') }}'); background-size: cover; background-position: center; height: 100vh; display: flex; align-items: center; justify-content: center; position: relative;">
    <div class="hero-overlay"></div> <!-- Dark overlay to enhance text visibility -->
    <div class="hero-content">
      <h1>Welcome to NilePath Telemedicine</h1>
      <p>Your trusted partner in healthcare and diagnostics. Book appointment, find nearby healthcare around you, and find reliable health information all in one place.</p>
      <div class="hero-buttons">
        <a href="#services" class="btn-primary">Explore Services</a>
        <a href="#contact" class="btn-secondary">Contact Us</a>
      </div>
    </div>
  </section>
  

  <!-- Main Section -->
  <main>
    <section id="about-us">
      <div class="about-container">
        <div class="about-image">
          <img src="{{ url_for('static', filename='images/photo-portrait-confident-male-doctor-white-coat-with-stethoscope_763111-303505.avif') }}" alt="About Us Image">
        </div>
        <div class="about-content">
          <h2>About Us</h2>
          <p><strong>Mission Statement:</strong> To enhance healthcare access in South Sudan by offering an online platform that streamlines booking appointment, provides crucial medical information, and connects users with healthcare facilities.</p>
          <p><strong>Our Story:</strong> NilePath Telemedicine was founded with the vision of transforming healthcare in South Sudan. Recognizing the challenges faced by many in accessing timely and reliable medical services, we developed a platform that leverages technology to bridge this gap.</p>
        </div>
      </div>
    </section>

 <!-- Services Section -->
 <section class="services">
  <h2>Our Services</h2>
  <div class="service-cards">
    <div class="card">
      <div class="icon">
        <img src="{{ url_for('static', filename='images/microscope-64.webp') }}" alt="Patient Icon">
      </div>
      <h3>Online Booking appointment</h3>
      <p>Schedule appointment with the doctors from the comfort of your home with ease.</p>
      <a href="#" class="learn-more-btn">Learn more ➔</a>
    </div>
    <div class="card">
      <div class="icon">
        <img src="{{ url_for('static', filename='images/disease.png') }}" alt="Disease Info Icon">
      </div>
      <h3>Disease Information</h3>
      <p>Access comprehensive information on various diseases and treatments.</p>
      <a href="#" class="learn-more-btn">Learn more ➔</a>
    </div>
    <div class="card">
      <div class="icon">
        <img src="{{ url_for('static', filename='images/clinicfinder.webp') }}" alt="Clinic Icon">
      </div>
      <h3>Clinic Finder</h3>
      <p>Locate nearby healthcare facilities and get contact details.</p>
      <a href="#" class="learn-more-btn">Learn more ➔</a>
    </div>
    <div class="card">
      <div class="icon">
        <img src="{{ url_for('static', filename='images/clinicfinder.webp') }}" alt="Clinic Icon">
      </div>
      <h3>Frequently asked Questions</h3>
      <p>Get the questions disturbing you about healthcare answered in short time with without too much stress.</p>
      <a href="#" class="learn-more-btn">Learn more ➔</a>
    </div>
  </div>
</section>



<!-- Testimonials Section -->
<section id="testimonies" class="testimonies-section">
  <div class="container">
    <h2 class="section-title">What Our Clients Say</h2>
    <div class="testimonies-grid">
      <!-- Testimony 1 -->
      <div class="testimony-card">
        <img src="{{ url_for('static', filename='images/client1.jpeg') }}" alt="Client 1" class="testimony-img">
        <div class="testimony-content">
          <h3>Kuir Juach</h3>
          <p class="testimony-title">CEO, DinkaComp.</p>
          <p class="testimony-text">"NilePath Telemedicine has transformed the way we handle diagnostic tests. Their platform is user-friendly and extremely efficient. Highly recommended!"</p>
        </div>
      </div>
      <!-- Testimony 2 -->
      <div class="testimony-card">
        <img src="{{ url_for('static', filename='images/client2.jpeg') }}" alt="Client 2" class="testimony-img">
        <div class="testimony-content">
          <h3>Kur Malual</h3>
          <p class="testimony-title">Software Engineer, Pan Africanist</p>
          <p class="testimony-text">"We can now access and book appointments quickly and provide better treatment to our patients, thanks to NilePath Telemedicine's seamless integration."</p>
        </div>
      </div>
      <!-- Testimony 3 -->
      <div class="testimony-card">
        <img src="{{ url_for('static', filename='images/client3.jpeg') }}" alt="Client 3" class="testimony-img">
        <div class="testimony-content">
          <h3>John Akech</h3>
          <p class="testimony-title">General Hospital worker and Data scientist</p>
          <p class="testimony-text">"The booking and report collection process is smooth and efficient. It's really easy for our patients to access their lab results online now."</p>
        </div>
      </div>
      <!-- Testimony 4 -->
      <div class="testimony-card">
        <img src="{{ url_for('static', filename='images/client2.jpeg') }}" alt="Client 4" class="testimony-img">
        <div class="testimony-content">
          <h3>Amir Deng</h3>
          <p class="testimony-title">Medical Lab Technician, Sahl Labs</p>
          <p class="testimony-text">"The user interface of NilePath Telemedicine is intuitive, making the diagnostic process easier for both technicians and patients."</p>
        </div>
      </div>
      <!-- Testimony 5 -->
      <div class="testimony-card">
        <img src="{{ url_for('static', filename='images/client3.jpeg') }}" alt="Client 5" class="testimony-img">
        <div class="testimony-content">
          <h3>Mary Luka</h3>
          <p class="testimony-title">Chief Pharmacist, Unity Health</p>
          <p class="testimony-text">"Using NilePath Telemedicine, our patients can quickly find and book services, and the follow-up is seamless. It has improved our workflow significantly."</p>
        </div>
      </div>
    </div>
  </div>
</section>



<!-- Flexbox container for FAQ and Healthcare News sections -->
<section class="faq-news-container">
  <!-- New FAQ Section -->
  <section class="faq">
    <h2>Frequently Asked Questions</h2>
    <div class="faq-container">
        <div class="faq-item">
            <h3>How do I book an appointment?</h3>
            <p>You can book an appointment by clicking on the 'Book Appointment' button and following the instructions. You'll be guided through selecting a doctor and choosing an available time slot.</p>
        </div>

        <div class="faq-item">
            <h3>Where can I find information about diseases?</h3>
            <p>To find information about diseases, click on the 'Search Diseases' tab in the navigation bar. You'll be able to search for diseases by name, and view details such as symptoms, causes, treatments, and preventive measures.</p>
        </div>

        <div class="faq-item">
            <h3>Can I get detailed treatment recommendations?</h3>
            <p>Yes, for each disease listed, we provide general treatment recommendations and guidelines. However, it’s important to consult with a healthcare professional for personalized medical advice.</p>
        </div>

        <div class="faq-item">
            <h3>How do I find a clinic near me?</h3>
            <p>You can easily locate nearby clinics by clicking on the 'Find Clinics' tab in the navigation bar. Enter your location or allow the site to access your location, and it will show clinics in your area with details like services offered, contact information, and distance from you.</p>
        </div>

        <div class="faq-item">
            <h3>Is the information on the site reliable?</h3>
            <p>All disease and clinic information provided on NilePath Telemedicine is carefully curated from reliable medical sources and verified by healthcare professionals. Our goal is to offer you accurate and up-to-date information.</p>
        </div>

        <div class="faq-item">
            <h3>How can I contact support if I need further help?</h3>
            <p>If you have any further questions or need assistance, you can reach out to our support team by clicking the 'Contact Support' button in the footer or using the live chat feature for real-time assistance.</p>
        </div>
    </div>
  </section>

  <!-- Healthcare News Section -->
  <section class="news">
    <h2>Latest Healthcare News</h2>
    <ul class="news-list">
        <li><a href="https://www.cdc.gov/vaccines/acip/recs/grade/covid-19-2024-2025-6-months-and-older.html">COVID-19 vaccination updates and new policies for 2024-2025.</a></li>
        <li><a href="https://www.cdc.gov/flu/prevent/index.html">New treatments available for common diseases in South Sudan.</a></li>
        <li><a href="https://www.cdc.gov/malaria/travelers/index.html">How to prevent malaria during the rainy season.</a></li>
        <li><a href="https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-vaccines-2024-2025">Latest advancements in telemedicine services in Africa.</a></li>
        <li><a href="https://www.cdc.gov/vaccines/covid-19/index.html">New government health initiatives improving rural healthcare access.</a></li>
        <li><a href="https://www.cdc.gov/mentalhealth/index.htm">5 tips for maintaining mental health in times of crisis.</a></li>
        <li><a href="https://www.cdc.gov/hiv/default.html">Breakthroughs in HIV/AIDS treatment: What you need to know.</a></li>
        <li><a href="https://www.cdc.gov/nutrition/index.html">The role of nutrition in disease prevention and recovery.</a></li>
        <li><a href="https://www.who.int/news-room/fact-sheets/detail/antibiotic-resistance">Understanding and fighting antibiotic resistance in developing countries.</a></li>
    </ul>
  </section>
</section>

 

<!-- Footer Section -->
<div class="footer-wrapper">
  <div class="footer">
    <div class="footer-section">
        <h4>NilePath Labs</h4>
        <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Mission</a></li>
            <li><a href="#">Contact Us</a></li>
        </ul>
    </div>

    <div class="footer-section">
        <h4>Features</h4>
        <ul>
            <li><a href="#">Lab Test Booking</a></li>
            <li><a href="#">Digital Test Results</a></li>
            <li><a href="#">Clinic Finder</a></li>
            <li><a href="#">Disease Information</a></li>
        </ul>
    </div>

    <div class="footer-section">
        <h4>Products</h4>
        <ul>
            <li><a href="#">Laboratory Software</a></li>
            <li><a href="#">EMR/EHR Software</a></li>
            <li><a href="#">Clinic Management</a></li>
            <li><a href="#">Health Information Hub</a></li>
        </ul>
    </div>

    <div class="footer-section subscription-box">
        <h4>Stay Updated!</h4>
        <p>Subscribe for the latest news and updates.</p>
        <form action="https://formsubmit.co/ajangcholaguer98@gmail.com" method="POST" class="contact_form grid">
            <div class="contact_content">
                <label for="" class="contact_input">Name</label>
                <input type="text" class="contact_input" name="name">
            </div>
            <div class="contact_content">
                <label for="" class="contact_input">Email</label>
                <input type="email" class="contact_input" name="email">
            </div>
            <div class="contact_content">
                <label for="" class="contact_input">Message</label>
                <textarea name="message" cols="0" rows="5" class="contact_input"></textarea>
            </div>
            <div>
                <button type="submit" class="button button--flex">
                    Send Message<i class="uil uil-message button_icon"></i>
                </button>
            </div>
        </form>

        <ul class="social-icons">
            <a href="#"><img src="{{ url_for('static', filename='images/twitter-64.webp') }}" alt="Twitter Icon"></a>
            <a href="#"><img src="{{ url_for('static', filename='images/Instagram-64.webp') }}" alt="Instagram Icon"></a>
            <a href="#"><img src="{{ url_for('static', filename='images/1_Facebook_colored_svg_copy-64.webp') }}" alt="Facebook Icon"></a>
        </ul>
    </div>
  </div>
</div>

<!-- No black footer at the bottom anymore -->

</body>
</html>






















