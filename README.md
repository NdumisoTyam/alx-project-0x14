## 📌 Overview
The **Movie Database (TMDB) API** provides a rich collection of endpoints for fetching detailed metadata about movies, TV shows, actors, and configuration data for images and translations.  
With this API, you can:
- Search for movies and TV shows by keyword
- Retrieve detailed resource information
- Fetch static lists (languages, countries, timezones)
- Power dynamic applications and media galleries

---

## 🔖 Version
The current stable release is **TMDB API v3.0**.

---

## 🚀 Available Endpoints

### 🎬 Movies
- **GET `/movie/{movie_id}`**  
  Fetch detailed information for a specific movie by its unique ID.

### 🔎 Search
- **GET `/search/movie`**  
  Search for movies by query string and receive a paginated list of matches.

### 📺 TV Shows
- **GET `/tv/{tv_id}`**  
  Retrieve detailed data for a TV show, including seasons and episodes.

### 🎭 People
- **GET `/person/{person_id}`**  
  Obtain biographical and filmography details for an actor, director, or other person.

### ⚙️ Configuration
- **GET `/configuration`**  
  Retrieve static configuration data (image base URLs and sizes, supported languages, countries, and timezones).

---

## 📥 Request and Response Format

**Example Request:**
```bash
curl --request GET \
  --url "https://api.themoviedb.org/3/movie/550?api_key=YOUR_API_KEY"

**Example Response:**
{
  "id": 550,
  "title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac and a slippery soap salesman...",
  "poster_path": "/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg"
}

**Example Response:**

`{  "id":  550,  "title":  "Fight Club",  "overview":  "A ticking-time-bomb insomniac and a slippery soap salesman...",  "poster_path":  "/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg"  }` 

----------

## 🔑 Authentication

TMDB offers two authentication methods:

### 1. API Key (Query Parameter)

`https://api.themoviedb.org/3/movie/11?api_key=YOUR_API_KEY` 

### 2. Bearer Token (Authorization Header)

`Authorization: Bearer YOUR_ACCESS_TOKEN` 

👉 You can generate and manage your API keys or tokens in the **TMDB dashboard**.

----------

## ⚠️ Error Handling

Common HTTP error codes:

-   **401 Unauthorized** → Missing or invalid API key/token.
    
-   **404 Not Found** → Resource doesn’t exist (invalid ID).
    
-   **429 Too Many Requests** → Rate limit exceeded (use retry-after logic).
    
-   **500 Internal Server Error** → Temporary TMDB issue (retry later).
    

**Example Error Response:**

`{  "status_code":  7,  "status_message":  "Invalid API key: You must be granted a valid key."  }` 

----------

## 📊 Usage Limits & Best Practices

-   TMDB enforces **50 requests per second** (rate limit).
    
-   Cache static endpoints (`/configuration`) to reduce redundant calls.
    
-   Use pagination (`page`, `include_adult`) for search results.
    
-   Batch related queries to minimize round trips.
    
-   Validate all user inputs (queries, IDs) to avoid malformed URLs.
    
-   Implement retries, circuit breakers, and monitoring for resiliency
