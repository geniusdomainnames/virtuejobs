export async function getUserLocation(headersList) {
  if (!headersList) {
    console.error("headersList is required");
    return null;
  }

  // let ip =
  //   headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  //   headersList.get("x-real-ip") ||
  //   "unknown";
  let ip = await
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const isLocal = ip === "::1" || ip === "127.0.0.1";
  if (isLocal) {
    ip = process.env.DEV_IP || "8.8.8.8";
    console.log("Using Dev IP")
  }
  else{
    console.log("Not using Dev IP")
  }

  if (ip === "unknown") {
    console.log("IP address not found in headers");
    return null;
  }

  try {
    const res = await fetch(
      `https://ipwho.is/${ip}?fields=ip,success,continent,country,region,city,lat,long,isp,flag`
    );

    if (!res.ok) {
      console.log(`HTTP error! status: ${res.status}`);
      return null;
    }

    const result = await res.json();

    if (!result?.success) {
      console.log(result?.message || "IP lookup failed");
      return null;
    }

    let responsedata ={
      ip,
      isLocal,
      error: false,
      data: {
        ...result,
        countryFlagImg: result.flag?.img || null,
        countryFlagEmoji: result.flag?.emoji || null,
      }}

      console.log(responsedata)


    return {
      ip,
      isLocal,
      error: false,
      data: {
        ...result,
        countryFlagImg: result.flag?.img || null,
        countryFlagEmoji: result.flag?.emoji || null,
      },
    };
  } catch (err) {
    console.log("Geo lookup failed:", err);
    return null;
  }
}
