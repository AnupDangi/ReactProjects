export default function Users({ user }) {
    const {
      avatar_url,
      followers,
      following, // Fixed typo here
      public_repos,
      login,
      created_at,
    } = user;
  
    const createdData = new Date(created_at);
  
    return (
      <div className="UserDetails">
        <img src={avatar_url} alt="User" className="avatar" />
        <a href={`https://github.com/${login}`} target="_blank" rel="noopener noreferrer">
          {user.name || login}
        </a>
        <p>
          User Joined on{" "}
          {`${createdData.getDate()} ${createdData.toLocaleString("en-us", { month: "short" })} ${createdData.getFullYear()}`}
        </p>
  
        <div>
          <p>Public Repos</p>
          <p>{public_repos}</p>
        </div>
        <div>
          <p>Followers</p>
          <p>{followers}</p>
        </div>
        <div>
          <p>Following</p>
          <p>{following}</p> 
        </div>
      </div>
    );
  }
  