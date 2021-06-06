INSERT INTO department (department_name)
VALUES
('Marketing'),
('Development'),
('Quality Assurance'),
('Help Desk');


INSERT INTO job_role (title, salary, department_id)
VALUES
('Marketing Manager', 125000, 1),
('Market Research Analyst', 90000, 1),
('SEO Manager' 65000, 1),
('Public Relations Coordinator' 75000, 1),
('Project Manager' 150000, 2),
('Engineer', 120000, 2),
('Dev Intern' 45,000, 2),
('Quality Manager', 85000, 3),
('Tester', 60000, 3),
('QA Intern' 45000.00, 3),
('Help Desk Manager', 55000, 4),
('Tech' 45000, 4);

INSERT INTO employee (first_name, last_name, job_role_id, manager_id)
VALUES
('James', 'Smith', 1, NULL),
('Maria', 'Rodriguez', 5, NULL),
('Robert', 'Johnson', 8, NULL),
('David', 'Hernandez', 11, NULL),
('James', 'Smith', 2, 1),
('Mary', 'Johnson', 3, 1),
('Michael', 'Brown', 4, 1),
('Paul', 'Thomas', 6, 2),
('Greg', 'Martin', 6, 2),
('Patrick', 'Perez', 6, 2),
('Jerry', 'Harris', 7, 2),
('Nikolas', 'Taylor', 9, 3),
('Eugene', 'Jackson', 9, 3),
('Martin', 'Sanchez', 10, 3),
('Phillip', 'Wilson', 12, 4),
('Marvin', 'Thompson', 12, 4),
('Jesus', 'Gonzalez', 12, 4);