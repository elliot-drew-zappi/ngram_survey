from turtle import color
import numpy as np
import json
import os
import pandas as pd

import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns

from collections import defaultdict

def read_data(fin):
    with open(fin, "r") as file_in:
        return(json.load(file_in))

def best_worse(data):
    bw_pct = defaultdict(lambda: {
        'win': 0,
        'loss': 0,
        'draw': 0,
        'total': 0,
    })
    for d in data:
        survey = d['survey']
        m1 = d['m1']
        m2 = d['m2']
        result = d['response']

        if(result == 1):
            bw_pct[m1]['win']+=1
            bw_pct[m1]['total']+=1
            bw_pct[m2]['loss']+=1
            bw_pct[m2]['total']+=1
        elif(result == 2):
            bw_pct[m1]['draw']+=1
            bw_pct[m1]['total']+=1
            bw_pct[m2]['draw']+=1
            bw_pct[m2]['total']+=1
        elif(result == 3):
            bw_pct[m1]['loss']+=1
            bw_pct[m1]['total']+=1
            bw_pct[m2]['win']+=1
            bw_pct[m2]['total']+=1

    return(bw_pct)

def bw_score(bw):
    return((bw['win']-bw['loss'])/bw['total'])

def plot_bw(bw_pct):
    df = pd.DataFrame(bw_pct).transpose()
    df['score'] = df.apply(lambda x: bw_score(x), axis=1)
    df['win_pc'] = df.apply(lambda x: (x['win']/x['total'])*100, axis=1)
    df['loss_pc'] = df.apply(lambda x: (x['loss']/x['total'])*100, axis=1)
    df['draw_pc'] = df.apply(lambda x: (x['draw']/x['total'])*100, axis=1)
    
    df["method"] = ['method_'+str(e+1) for e in df.index]
    df['score_col'] = df['score'].apply(lambda x: 0 if x<0 else 1)
    df = df.sort_values(by='score', ascending=False)
    splot = sns.barplot(data=df, y="method", x="score", hue='score_col')
    for con in splot.containers:
        plt.bar_label(con, fmt='%.2f', padding=-30, color='white')
    plt.tight_layout()
    plt.legend('', frameon=False)
    plt.show()
    return(df, splot)

all_data = []

for f in os.listdir('./data'):
    if f.endswith('.json'):
        all_data+=(read_data('./data/'+f))
