// Ocean View Resort - Application Logic

// --- Constants & Config ---
const ROOM_RATES = {
  'Standard': 50,
  'Deluxe': 80,
  'Suite': 120
};

const DEFAULT_USER = {
  username: 'admin',
  password: '123'
};

// --- Mock Database (LocalStorage) ---
const DB = {
  getReservations() {
    return JSON.parse(localStorage.getItem('ovr_reservations')) || [];
  },
  saveReservation(res) {
    const reservations = this.getReservations();
    reservations.push(res);
    localStorage.setItem('ovr_reservations', JSON.stringify(reservations));
  },
  findReservation(id) {
    return this.getReservations().find(r => r.reservation_id === id);
  }
};

// --- UI Components & Selectors ---
const views = document.querySelectorAll('.view-section');
const navItems = document.querySelectorAll('.nav-item');
const loginOverlay = document.getElementById('login-overlay');
const appMain = document.getElementById('app-main');
const dateDisplay = document.getElementById('current-time');

// --- Helper Functions ---
const showView = (viewId) => {
  views.forEach(view => {
    view.classList.remove('active');
    if (view.id === viewId) view.classList.add('active');
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.view === viewId) item.classList.add('active');
  });

  document.getElementById('view-title').innerText = 
    viewId.charAt(0).toUpperCase() + viewId.slice(1).replace('-', ' ') + ' Overview';
};

const calculateNights = (inDate, outDate) => {
  const start = new Date(inDate);
  const end = new Date(outDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
};

const refreshDashboard = () => {
    const reservations = DB.getReservations();
    const totalBookings = reservations.length;
    const active = reservations.filter(r => new Date(r.check_out) >= new Date()).length;
    const totalRevenue = reservations.reduce((sum, r) => sum + r.total_cost, 0);

    document.getElementById('total-bookings-count').innerText = totalBookings;
    document.getElementById('active-guests-count').innerText = active;
    document.getElementById('revenue-estimate').innerText = `$${totalRevenue}`;
    document.getElementById('occupied-rooms-count').innerText = `${Math.min(100, Math.round((active/90)*100))}%`;

    const recentList = document.getElementById('recent-bookings-list');
    recentList.innerHTML = '';
    reservations.slice(-5).reverse().forEach(r => {
        recentList.innerHTML += `
            <tr>
                <td>#${r.reservation_id}</td>
                <td>${r.guest_name}</td>
                <td>${r.room_type}</td>
                <td>${r.check_in}</td>
                <td><span class="badge badge-success">Confirmed</span></td>
            </tr>
        `;
    });
};

const refreshRecords = (filter = '') => {
  const reservations = DB.getReservations();
  const list = document.getElementById('all-bookings-list');
  list.innerHTML = '';
  
  const filtered = reservations.filter(r => 
    r.guest_name.toLowerCase().includes(filter.toLowerCase()) || 
    r.reservation_id.toString().includes(filter)
  );

  filtered.forEach(r => {
    list.innerHTML += `
      <tr>
        <td>#${r.reservation_id}</td>
        <td>${r.guest_name}</td>
        <td>${r.room_type}</td>
        <td>${r.check_in}</td>
        <td>${r.check_out}</td>
        <td>$${r.total_cost}</td>
        <td>
          <button style="padding: 4px 8px; font-size: 12px; border-radius: 4px; border: 1px solid var(--primary); background: transparent; color: var(--primary);" 
          onclick="viewBill('${r.reservation_id}')">View Bill</button>
        </td>
      </tr>
    `;
  });
};

// Global for inline button
window.viewBill = function(id) {
    showView('billing');
    document.getElementById('calc-res-id').value = id;
    document.getElementById('search-bill-btn').click();
};

// --- View State Initialization ---
dateDisplay.innerText = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// --- Event Listeners ---

// Navigation
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const destination = item.dataset.view;
    if (destination) showView(destination);
    
    if (destination === 'dashboard') refreshDashboard();
    if (destination === 'records') refreshRecords();
  });
});

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === DEFAULT_USER.username && pass === DEFAULT_USER.password) {
    loginOverlay.style.opacity = '0';
    setTimeout(() => {
      loginOverlay.style.display = 'none';
      appMain.style.display = 'flex';
      refreshDashboard();
    }, 500);
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
});

// Reservation Submission
document.getElementById('reservation-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const cin = document.getElementById('check_in').value;
  const cout = document.getElementById('check_out').value;
  
  if (new Date(cout) <= new Date(cin)) {
    alert('Check-out date must be after check-in date!');
    return;
  }

  const roomType = document.getElementById('room_type').value;
  const nights = calculateNights(cin, cout);
  const cost = nights * ROOM_RATES[roomType];

  const newRes = {
    reservation_id: 1000 + DB.getReservations().length + 1,
    guest_name: document.getElementById('guest_name').value,
    contact: document.getElementById('contact_number').value,
    address: document.getElementById('address').value,
    room_type: roomType,
    check_in: cin,
    check_out: cout,
    nights: nights,
    rate: ROOM_RATES[roomType],
    total_cost: cost,
    created_at: new Date().toISOString()
  };

  DB.saveReservation(newRes);
  alert(`Reservation Confirmed! ID: #${newRes.reservation_id}`);
  e.target.reset();
  showView('dashboard');
  refreshDashboard();
});

// Billing Search
document.getElementById('search-bill-btn').addEventListener('click', () => {
  const idInput = document.getElementById('calc-res-id').value.replace('#', '').replace('RES-', '');
  const res = DB.findReservation(parseInt(idInput));
  
  const details = document.getElementById('bill-details');
  if (res) {
    document.getElementById('bill-guest-name').innerText = res.guest_name;
    document.getElementById('bill-res-id').innerText = `ID: #${res.reservation_id}`;
    document.getElementById('bill-date').innerText = `Issued on ${new Date().toLocaleDateString()}`;
    document.getElementById('bill-room-info').innerText = `${res.room_type} Room`;
    document.getElementById('bill-nights').innerText = `${res.nights} night(s)`;
    document.getElementById('bill-rate').innerText = `$${res.rate}/night`;
    document.getElementById('bill-total').innerText = `$${res.total_cost}`;
    
    details.style.display = 'block';
  } else {
    details.style.display = 'none';
    alert('No reservation found with that ID.');
  }
});

// Search Filter
document.getElementById('search-bookings').addEventListener('input', (e) => {
  refreshRecords(e.target.value);
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    if(confirm('Are you sure you want to exit the system?')) {
        location.reload();
    }
});

// Initial Data Mock (if empty)
if (DB.getReservations().length === 0) {
    const dummy = {
        reservation_id: 1001,
        guest_name: "James Fernando",
        contact: "+94 77 123 4567",
        address: "Colombo 07, Sri Lanka",
        room_type: "Deluxe",
        check_in: "2026-03-05",
        check_out: "2026-03-10",
        nights: 5,
        rate: 80,
        total_cost: 400,
        created_at: new Date().toISOString()
    };
    DB.saveReservation(dummy);
}
