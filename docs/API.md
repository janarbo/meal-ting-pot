### Accounts
![image info](createAccount.png)
This action creates an account tied to a specific user and stores it within the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
{
    {
        "first_name": "string",
        "last_name": "string",
        "username": "string",
        "hashed_password": "string",
        "email": "string",
        "is_chef": true
    }
}
```
</details>
