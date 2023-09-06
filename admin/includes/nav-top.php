<nav class="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <ul class="navbar-nav flex-nowrap ms-auto">
                            <li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
                            </li> 
                            <li class="nav-item dropdown no-arrow">
                               <div class="nav-item dropdown no-arrow"> <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span class="d-none d-lg-inline me-2 text-gray-600 small">
                               <?php
                                if (isset($_SESSION['email'])) {
                                    // Include the database configuration
                                    include('../config.php');

                                    // Get the logged-in user's email from the session
                                    $email = $_SESSION['email'];

                                    // Query to fetch the user's name and surname based on their email
                                    $query = "SELECT name, surname FROM users WHERE email = '$email'";
                                    $result = $conn->query($query);

                                    if ($result->num_rows == 1) {
                                        $row = $result->fetch_assoc();
                                        $firstName = $row['name']; // Store 'name' as first name
                                        $lastName = $row['surname']; // Store 'surname' as last name

                                        // Display the user's first and last name
                                        echo "Welcome, $firstName $lastName!";
                                    } else {
                                        // User not found in the database, handle accordingly
                                        echo "User not found.";
                                    }
                                }
                                    ?>
                                </span></a>
                                    <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                        <div class="dropdown-divider"></div><a class="dropdown-item" href="includes/logout.php"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>