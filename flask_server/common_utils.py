from transformers import SegformerImageProcessor, AutoModelForSemanticSegmentation
from transformers import AutoFeatureExtractor, SegformerForSemanticSegmentation
from sentence_transformers import SentenceTransformer
from transformers import ViTImageProcessor, ViTForImageClassification, AutoFeatureExtractor, AutoModel,ViTModel
from sentence_transformers import util
from transformers import AutoTokenizer
# from splade.models.transformer_rep import Splade
from transformers import AutoTokenizer, AutoModelForMaskedLM


# import matplotlib.pyplot as plt
import numpy as np
from rembg import remove
from PIL import Image
import requests
import matplotlib.pyplot as plt
import torch.nn as nn
import pandas as pd
import json
import torch
from collections import defaultdict
from scipy.spatial import distance
import os
from difflib import SequenceMatcher
import urllib.request
from PIL import Image
from scipy import sparse
import ast
import shutil
from PIL import Image
import pandas as pd
import os
import urllib.request
from tqdm.auto import tqdm
import json
from scipy.spatial import distance
import numpy as np
import matplotlib.pyplot as plt
import re

import tensorflow as tf
# from langchain import OpenAI
from langchain.chains import LLMChain, ConversationChain
from langchain.chains.conversation.memory import (ConversationBufferMemory,
                                                  ConversationSummaryMemory)
from langchain.llms import OpenAI
import openai
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.llms import OpenAI

from flask import Flask, request, jsonify
from flask import Flask
from flask_cors import CORS