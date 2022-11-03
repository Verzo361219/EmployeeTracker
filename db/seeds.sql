INSERT INTO departments  (deptName)
values  ('marketing'),
        ('finance'),
        ('sales'),
        ('engineering');


INSERT INTO roles (title, salary, department_id)
values  ('Legal Team Lead', 90000, 1),
        ('Social Media Specialist', 40000, 1),
        ('Senior Developer', 150000, 4),
        ('Junior Developer', 70000, 4),
        ('Sales Manager', 50000, 2),
        ('Salesperson', 30000, 2),
        ('Account Manager', 70000,3),
        ('Accountant', 55000 ,3);
    
        

INSERT INTO employees (first_name, last_name, role_id, manager_id)
values  ('Joe', 'Johnson', 1,  NULL),
        ('Peter', 'Middley', 2, 1),
        ('Missy', 'Anderson', 3, NULL),
        ('George', 'Crosby', 4, 2),
        ('Jennifer', 'Smith', 5, NULL),
        ('Tom', 'Brady', 6, 5),
        ('Ashley', 'Geraldson', 7, NULL),
        ('Mike', 'Hobbs', 8, 7); 

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;