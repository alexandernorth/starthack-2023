#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import numpy as np

import os


# In[ ]:


df_zell = pd.read_excel(os.path.join("..","..", "..", "BellFoodGroup_STARTHACK23", "Export_Energydata_Bell_CH_Zell.xlsx"), skiprows=21, usecols='A:B')

df_zell["Timestamp:"] = pd.to_datetime(df_zell["Timestamp:"], format='%Y-%m-%d %H:%M:%S')
df_zell["Timestamp:"] = df_zell["Timestamp:"].dt.strftime("%Y-%m-%dT%H:%M:%SZ")

df_zell = df_zell.rename(columns={"Timestamp:": "time", "Unnamed: 1": "kw"})

df_zell = df_zell[df_zell['kw'].notna()]

df_zell.insert(0, 'site', 0)

#df_zell.head()


# In[ ]:


df_schiltach = pd.read_excel(os.path.join("..","..", "..", "BellFoodGroup_STARTHACK23", "Export_Energydata_Bell_DE_Schiltach.xlsx"), skiprows=21, usecols='A:B')

df_schiltach["Timestamp:"] = pd.to_datetime(df_schiltach["Timestamp:"], format='%Y-%m-%d %H:%M:%S')
df_schiltach["Timestamp:"] = df_schiltach["Timestamp:"].dt.strftime("%Y-%m-%dT%H:%M:%SZ")

df_schiltach = df_schiltach.rename(columns={"Timestamp:": "time", "Unnamed: 1": "kw"})

df_schiltach = df_schiltach[df_schiltach['kw'].notna()]

df_schiltach.insert(0, 'site', 1)

#df_schiltach.head()


# In[ ]:


df_feldhof = pd.read_excel(os.path.join("..","..", "..", "BellFoodGroup_STARTHACK23", "Export_Energydata_Eisberg_DaellikonFeldhof.xlsx"), skiprows=21, usecols='A:B')

df_feldhof["Timestamp:"] = pd.to_datetime(df_feldhof["Timestamp:"], format='%Y-%m-%d %H:%M:%S')
df_feldhof["Timestamp:"] = df_feldhof["Timestamp:"].dt.strftime("%Y-%m-%dT%H:%M:%SZ")

df_feldhof = df_feldhof.rename(columns={"Timestamp:": "time", "Unnamed: 1": "kw"})

df_feldhof = df_feldhof[df_feldhof['kw'].notna()]

df_feldhof.insert(0, 'site', 2)

#df_feldhof.head()


# In[ ]:


df_orbe = pd.read_excel(os.path.join("..","..", "..", "BellFoodGroup_STARTHACK23", "Export_Energydata_Hilcona_Orbe.xlsx"), skiprows=21, usecols='A:B')

df_orbe["Timestamp:"] = pd.to_datetime(df_orbe["Timestamp:"], format='%Y-%m-%d %H:%M:%S')
df_orbe["Timestamp:"] = df_orbe["Timestamp:"].dt.strftime("%Y-%m-%dT%H:%M:%SZ")

df_orbe = df_orbe.rename(columns={"Timestamp:": "time", "Unnamed: 1": "kw"})

df_orbe = df_orbe[df_orbe['kw'].notna()]

df_orbe.insert(0, 'site', 3)

#df_orbe.head()


# In[ ]:


df = pd.concat([df_zell, df_schiltach, df_feldhof, df_orbe], ignore_index=True)


# engine = create_engine('sqlite://', echo=False)
# df.to_sql(name="sitedata", con=engine)
# 
# with open('sitedata.sql', 'w') as f:
#     with engine.connect() as conn:
#         for line in conn.connection.iterdump():
#             f.write(line)
#             f.write('\n')

# In[ ]:


with open('sitedata.json.zip', 'wb') as f:
    df.to_json(f, compression='zip', orient='records', date_format='iso')

