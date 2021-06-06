DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS job_role;
DROP TABLE IF EXISTS employees;


CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE job_role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT fk_job_role_id FOREIGN KEY (job_role_id) REFERENCES job_role(id)
);