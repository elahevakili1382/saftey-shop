document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('contactForm');

    if(!form) return;

    form.addEventListener('submit', async (e) =>{
        e.preventDefault();


        const data = {
            name: document.getElementById('name').value.trim(),
            phone : document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),

        };

        if(!data.name || !data.phone || !data.message){

              alert('❌ لطفاً همه فیلدهای ضروری را پر کنید');
              return;
            
        }

        try{
            const res = await fetch('' ,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if(!res.ok) throw new Error('خطا ارسال شد ');

      alert('✅ پیام شما با موفقیت ارسال شد');
      form.reset();
        } catch (err){
             alert('❌ خطا در ارسال پیام، دوباره تلاش کنید');
             console.error(err);
        }
    })
})