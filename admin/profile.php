<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Profile - Lnk Tree</title>
    <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
</head>

<body id="page-top">
    <?php
        // Include the sidebar.php file
        include('includes/sidebar.php');
        ?>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav class="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <ul class="navbar-nav flex-nowrap ms-auto">
                            <li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
                                <div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                    <form class="me-auto navbar-search w-100">
                                        <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
                                            <div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <li class="nav-item dropdown no-arrow">
                                <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span class="d-none d-lg-inline me-2 text-gray-600 small">Francisco Oliveira</span></a>
                                    <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</a><a class="dropdown-item" href="#"><i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</a><a class="dropdown-item" href="#"><i class="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</a>
                                        <div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="container-fluid">
                    <h3 class="text-dark mb-4">Profile</h3>
                    <div class="card shadow mb-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">User Settings</p>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="username"><strong>Username</strong></label><input class="form-control" type="text" id="username" placeholder="user.name" name="username"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="email"><strong>Email Address</strong></label><input class="form-control" type="email" id="email-1" placeholder="user@example.com" name="email"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="first_name"><strong>First Name</strong></label><input class="form-control" type="text" id="first_name" placeholder="John" name="first_name"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="last_name"><strong>Last Name</strong></label><input class="form-control" type="text" id="last_name-1" placeholder="Doe" name="last_name"></div>
                                    </div>
                                </div>
                                <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                            </form>
                        </div>
                    </div>
                    <div class="card shadow mb-3">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">Password Management</p>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="email"><strong>Current Password</strong></label><input class="form-control" type="password" name="current-password" required=""></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="last_name"><strong>New Password</strong></label><input class="form-control" type="password" name="new-password" required=""></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3"><label class="form-label" for="last_name"><strong>Confirm Password</strong></label><input class="form-control" type="password" name="confirm-password" required=""></div>
                                    </div>
                                </div>
                                <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Update</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="bg-white sticky-footer">
                <div class="container my-auto">
                    <div class="text-center my-auto copyright"><span>Copyright © Indiews - Digital Agency</span></div>
                </div>
            </footer>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/script.min.js"></script>
</body>

</html>