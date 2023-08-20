import pandas as pd

udf = pd.read_csv('../stored_result/User.csv')
print(udf.head())
u_genders = {int(row['userID']):"Male" if row['gender']=='M' else "Female" for _,row in udf.iterrows()}