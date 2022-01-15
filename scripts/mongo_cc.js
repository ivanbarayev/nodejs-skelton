db.createCollection("log_errors")

db.log_errors.insert({
    "flag_type": 0,
    "request_src": 0,
    "request_path": "",
    "request_file": "",
    "request_func": "",
    "content_error": "",
    "created_at": "",
    "is_solved": 0,
})


//mongoose
/* MONGO
document //database
collection //table
*/

/* POSTGRES
database
schema
table
*/

/* MYSQL
database
table
*/

/* MSSQL
database
table
*/
