import secret
from yoomoney import Client, Quickpay
token = secret.yoomoney_api_access_token
client = Client(token)
quickpay = Quickpay(
            receiver="4100119162956192",
            quickpay_form="shop",
            targets="Sponsor this project",
            paymentType="SB",
            sum=150,
            )
print(quickpay.base_url)
print(quickpay.redirected_url)