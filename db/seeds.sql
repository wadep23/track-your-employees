INSERT INTO department (name)
VALUES
('Marketing'),
('Development'),
('Quality Assurance'),
('Help Desk');

INSERT INTO role (title, salary, department_id)
VALUES
('Marketing Manager', 125000, 1),
('Market Research Analyst', 90000, 1),
('SEO Manager', 65000, 1),
('Public Relations Coordinator', 75000, 1),
('Project Manager', 150000, 2),
('Engineer', 120000, 2),
('Dev Intern', 45000, 2),
('Quality Manager', 85000, 3),
('Tester', 60000, 3),
('QA Intern', 45000, 3),
('Help Desk Manager', 55000, 4),
('Tech', 45000, 4);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES
('James', 'Smith', NULL, 1),
('Maria', 'Rodriguez', NULL, 5),
('Robert', 'Johnson', NULL,  8),
('David', 'Hernandez', NULL,  11),
('James', 'Brown', 1, 2),
('Mary', 'Johnson', 1, 3),
('Michael', 'Brown', 1, 4),
('Paul', 'Thomas', 2, 6),
('Greg', 'Martin', 2, 6),
('Patrick', 'Perez', 2, 6),
('Jerry', 'Harris', 2, 7),
('Nikolas', 'Taylor', 3, 9),
('Eugene', 'Jackson', 3, 9),
('Martin', 'Sanchez', 3, 10),
('Phillip', 'Wilson', 4, 12),
('Marvin', 'Thompson', 4, 12),
('Jesus', 'Gonzalez', 4, 12);

