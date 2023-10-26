<script>
    let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let time;
    let hour;
    let min;
    const updateTime = () => {
        const date = new Date();
        var midday = "AM";
        time = date.toLocaleDateString();
        hour = date.getHours();
        min = date.getMinutes().toString().padStart(2,'0');
        midday = (hour >= 12) ? " PM" : " AM";
        time = hour + " : " + min + midday;
    };
    updateTime();
    setInterval(updateTime, 1000);
</script>

<div class="text-white">
    <h2 class="text-5xl">{time}</h2>
    <p>{currentTimezone}</p>
</div>

<style>
    div {
        font-family: 'Orbitron', sans-serif;
        text-align: center;
        margin-top: auto;
        margin-bottom: auto;
    }

</style>